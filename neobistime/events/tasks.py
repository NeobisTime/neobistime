from itertools import chain
from typing import List

from celery import shared_task
from django.core.mail import send_mail
from django.db import IntegrityError

from events.models import Event, Poll
from users.models import CustomUser


@shared_task()
def notify_users(departments: List, individual_users: List, event_id):
    """
    Celery task for asynchronous email notification of users
    :param departments: List containing departments id
    :param individual_users: List containing individual users_email
    :param event_id: id of an event which users are going to be invited
    :return: None
    """
    recipients = [
        [user for user in CustomUser.objects.filter(department_id__name=department)] for department in departments
    ]

    for email in individual_users:
        try:
            recipients.append(CustomUser.objects.get(email=email))
        except CustomUser.DoesNotExist:
            continue

    recipients = list(chain(*recipients))
    recipients_emails = [user.email for user in recipients]

    event = Event.objects.get(pk=event_id)
    body_message = f'Здравствуй, мы организовали' \
                   f' новое мероприятие "{event.title}" от {event.owner}' \
                   f' \n Дата {event.start_date}\nМесто {event.place} ' \
                   f'\nС уважением, команда Необис'

    # TODO добавить ссылку на ивент в тело сообщения
    send_mail('Новый Ивент от Необиса', body_message,
              'neobistime.kg@gmail.com',
              recipients_emails)

    for user in recipients:
        try:
            Poll.objects.create(event=event, user=user)
        except IntegrityError:
            continue
