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
    path('notify/<int:id>/', notify, name='emailing'),

]
urlpatterns += router.urls
