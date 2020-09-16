import uuid
from datetime import datetime
from itertools import chain
from typing import List

import pytz
from celery import shared_task
from decouple import config
from django.conf import settings
from django.core.mail import send_mail
from django.db import IntegrityError

from events.models import Attendees, Event, Poll, RepeatedEvent
from users.models import CustomUser
from .bot import telegram_notify_user
from .utils import date_generator

timezone_ = pytz.timezone(settings.TIME_ZONE)


@shared_task()
def notify_users(departments: List, individual_users: List, event_id, user_notification):
    """
    Celery task for asynchronous email notification of users, creation of kinda useless class Attendees,
     and creation Poll
    :param user_notification: Bool checking whether email notification is required on not
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


    # Notification of users
    if user_notification:
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
            if user.chat_id and user_notification:
                telegram_notify_user(user.chat_id, body_message, event.id)
        except IntegrityError:
            continue


@shared_task()
def create_repeated_events(request_data, weekdays, user_id, departments, users):
    from .serializers import RepeatedEventSerializer
    lc_start = timezone_.localize(datetime.strptime(request_data["start"], "%Y-%m-%dT%H:%M"))
    lc_end = timezone_.localize(datetime.strptime(request_data["end"], "%Y-%m-%dT%H:%M"))
    dates = date_generator(lc_start, lc_end)
    start, end = next(dates)
    data = request_data.copy()
    group_uuid = uuid.uuid4()
    parent_event = RepeatedEvent.objects.create(weekdays=weekdays)
    parent_event.save()

    owner = CustomUser.objects.get(pk=user_id)
    while end <= lc_end:
        if start.weekday() in weekdays:
            data["start"] = start.strftime("%Y-%m-%dT%H:%M:%S")
            data["end"] = end.strftime("%Y-%m-%dT%H:%M:%S")
            event_data = RepeatedEventSerializer(data=data)
            event_data.is_valid(raise_exception=True)
            event = event_data.save(owner=owner, group_id=str(group_uuid), parent_event=parent_event)

            notify_users(departments, users, event.id, False)
        start, end = next(dates)
