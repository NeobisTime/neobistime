from allauth.account.views import PasswordChangeView, PasswordResetView, confirm_email
from django.conf.urls import url
from django.urls import include, path

from .views import UserListView, DepartmentListView

urlpatterns = [
    path('', UserListView.as_view(), name='list-users'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    path('departments/', DepartmentListView.as_view(), name='list-departments'),
    url(r'^change/password/', PasswordChangeView.as_view(), ),
    url(r'^reset/password/', PasswordResetView.as_view(), ),
    url(r'^account/', include('allauth.urls')),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email,
        name='account_confirm_email'),
]
