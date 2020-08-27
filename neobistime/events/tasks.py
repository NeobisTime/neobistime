from itertools import chain
from typing import List
from decouple import config
from celery import shared_task
from django.core.mail import send_mail
from django.db import IntegrityError
from .bot import telegram_notify_user
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

    try:
        Attendees.objects.create(event=event, departments=departments, individual_users=individual_users)
    except IntegrityError:
        Attendees.objects.filter(event=event_id).update(departments=departments, individual_users=individual_users)

    recipients = list(chain(*[
        [user for user in CustomUser.objects.filter(department_id=department)] for department in departments
    ]))

    for email in individual_users:
        try:
            recipients.append(CustomUser.objects.get(email=email))
        except CustomUser.DoesNotExist:
            continue

    place = event.place

    if not place:
        place = event.address

    recipients_emails = [user.email for user in set(recipients)]
    url = config('ROOT_URL') + f'/today/{event.id}/'
    body_message = f'Здравствуй, мы организовали новое мероприятие "{event.title}" от {event.owner}\n' \
                   f'Дата {event.start_date}\n' \
                   f'Место {place}\n' \
                   f'Ссылка <a href="{url}">{url}</a>' \
                   f'С уважением, команда Необис'

    send_mail('Новый Ивент от Необиса', body_message,
              'neobistime.kg@gmail.com',
              recipients_emails)

    for user in recipients:
        try:
            Poll.objects.create(event=event, user=user)
            if user.chat_id:
                telegram_notify_user(user.chat_id, body_message, event.id)
        except IntegrityError:
            continue
