from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail
from .models import CustomUser
from rest_framework import generics, permissions
from .serializers import *


class UserListView(generics.ListAPIView):
    """
    List of all Users
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)


def send_email_notification(request):
    """
    Sending email for all active users
    :param request:
    :return:
    """
    recipients = [user.email for user in CustomUser.objects.all()]

    send_mail('Новый Ивент', 'Приходи на мастер класс от Питон департамента', 'neobistime.kg@gmail.com', recipients)
    return HttpResponse("Рассылка завершена !")
