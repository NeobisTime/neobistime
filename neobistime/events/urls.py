from django.urls import path

from . import views

urlpatterns = [
    path('events/', views.EventListCreateView().as_view(), name='events'),
    path('events/<int:pk>/', views.EventDetail().as_view(), name='detail-event'),
    path('events/<int:event_id>/notify/', views.notify_user, name='notification-email'),

    path('place/', views.PlaceListCreateView().as_view(), name='places'),
    path('poll/', views.PollCreateView().as_view(), name='create-poll'),
    path('poll/<int:pk>/', views.PollDetailView().as_view(), name='detail-poll'),
    path('my_poll/', views.MyPollListView().as_view(), name='my-polls'),
]
