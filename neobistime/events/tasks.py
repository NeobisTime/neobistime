from itertools import chain
from typing import List

from celery import shared_task
from django.core.mail import send_mail
from django.db import IntegrityError

from events.models import Event, Poll, Attendees
from users.models import CustomUser


@shared_task()
def notify_users(departments: List, individual_users: List, event_id):
    """
    Celery task for asynchronous email notification of users, creation of kinda useless class Attendees,
     and creation Poll
    :param departments: List containing departments id
    :param individual_users: List containing individual users_email
    :param event_id: id of an event which users are going to be invited
    :return: None
    """
    event = Event.objects.get(pk=event_id)

    print()
    print()
    print(departments, individual_users)
    print()
    print()

    try:
        Attendees.objects.create(event=event, departments=departments, individual_users=individual_users)
    except IntegrityError:
        Attendees.objects.filter(event=event_id).update(departments=departments, individual_users=individual_users)

    recipients = [
        [user for user in CustomUser.objects.filter(department_id=department)] for department in departments
    ]

    users = []
    for email in individual_users:
        try:
            users.append(CustomUser.objects.get(email=email))
        except CustomUser.DoesNotExist:
            continue

    recipients = set(chain(*recipients, users))
    recipients_emails = [user.email for user in recipients]

    body_message = f'Здравствуй, мы организовали' \
                   f'новое мероприятие "{event.title}" от {event.owner}\n' \
                   f'Дата {event.start_date}\n' \
                   f'Место {event.place}\n' \
                   f'С уважением, команда Необис'

    # TODO добавить ссылку на ивент в тело сообщения
    send_mail('Новый Ивент от Необиса', body_message,
              'neobistime.kg@gmail.com',
              recipients_emails)

    for user in recipients:
        try:
            Poll.objects.create(event=event, user=user)
        except IntegrityError:
            continue
