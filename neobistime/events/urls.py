from django.urls import path
from . import views
from .poll_sending import *

urlpatterns = [
    path('', views.EventListCreateView().as_view(), name='events'),
    path('event/<int:pk>/', views.EventDetail().as_view(), name='detail-event'),
    path('event/<int:pk>/notify/', views.notify_user, name='notification-email'),

    path('place/', views.PlaceListCreateView().as_view(), name='places'),
    path('poll/', views.PollCreateView().as_view(), name='create-poll'),
    path('poll/<int:pk>/', views.PollDetailView().as_view(), name='detail-poll'),
    path('my_poll/', views.MyPollListView().as_view(), name='my-polls'),
    path('notify/<int:id>/', notify, name='emailing'),
]
