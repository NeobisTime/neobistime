from allauth.account.views import confirm_email, PasswordChangeView, PasswordSetView, PasswordResetView
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from .views import send_email_notification, UserListView

urlpatterns = [
    path('', UserListView.as_view(), name='list-users'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),

    url(r'^change/password/', PasswordChangeView.as_view(), ),
    url(r'^reset/password/', PasswordResetView.as_view(), ),
    url('emailing/', send_email_notification, name='email-notification'),
    url(r'^account/', include('allauth.urls')),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email,
        name='account_confirm_email'),
]