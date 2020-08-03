from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.db import IntegrityError
from django.http import HttpResponse
from rest_framework.exceptions import NotFound

from users.models import CustomUser
from .models import *


def notify(request, id, pd=False, pm=False, jd=False, fd=False, ui=False, cd=False, nd=False, ad=False, ios=False,
           individual_persons=None):
    # pd = python Department,pm=Projects Management,jd=Java/Kotlin, fd=Frontend,
    # ios=IOS, cd=C#, ad=Android, nd=NodeJS, ui=UX/UI
    try:
        event = Event.objects.get(id=id)
    except ObjectDoesNotExist:
        raise NotFound("Ивент не найден")
    recipients = []
    if pd: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='Python Department')]
    if pm: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='Project Management')]
    if jd: recipients += [user.email for user in
                          CustomUser.objects.filter(department_id__name='Java/Kotlin Department')]
    if fd: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='Frontend Department')]
    if ui: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='UI/UX Department')]
    if cd: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='C# Department')]
    if ad: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='Android Department')]
    if nd: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='NodeJS Department')]
    if ios: recipients += [user.email for user in CustomUser.objects.filter(department_id__name='IOS Department')]
    if individual_persons is not None:
        recipients += individual_persons

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

    return HttpResponse("Рассылка завершена")
