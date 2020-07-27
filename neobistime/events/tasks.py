from typing import Dict, List

from celery import shared_task
from django.core.mail import send_mail
from django.db import IntegrityError

from events.models import Event, Poll
from users.models import CustomUser


@shared_task()
def notify_users(departments: List, individual_users: List, event_id):
    recipients = [CustomUser.objects.filter(departments_id__name=department) for department in departments]

    recipients += individual_users

    event = Event.objects.get(pk=event_id)

    body_message = f'Здравствуй, мы организовали' \
                   f' новое мероприятие "{event.title}" от {event.owner}' \
                   f' \n Дата {event.start_date}\nМесто {event.place} ' \
                   f'\nС уважением, команда Необис'
    # TODO добавить ссылку на ивент в тело сообщения
    send_mail('Новый Ивент от Необиса', body_message,

              'neobistime.kg@gmail.com',
              recipients)

    for user in recipients:
        try:
            Poll.objects.create(event=event, user=user)
        except IntegrityError:
            continue
