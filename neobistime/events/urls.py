from django.urls import path
from . import views
from .poll_sending import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('events', views.EventViewSet, basename='events')

urlpatterns = [
    path('place/', views.PlaceListView().as_view(), name='places'),
    path('poll/', views.PollCreateView().as_view(), name='create-poll'),
    path('poll/<int:pk>/', views.PollDetailView().as_view(), name='detail-poll'),
    path('my_poll/', views.MyPollListView().as_view(), name='my-polls'),
    path('my_events/', views.MyEventsListView().as_view(), name='my-events'),
    path('my_events/<int:id>/', views.PollsForMyEventView().as_view(), name='polls-for-my-event'),
    path('my_events/<int:id>/poll/<int:pk>/', views.UpdatePollForMyEventView().as_view(),
         name='update-poll-for-my-event'),
    path('events/<int:event_id>/notify/', views.notify_user, name='notification-email'),
]

urlpatterns += router.urls
