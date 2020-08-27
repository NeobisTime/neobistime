from django.urls import path
from rest_framework.routers import DefaultRouter
from . import statistics
from . import views
import bot

router = DefaultRouter()
router.register('events', views.EventViewSet, basename='events')
router.register('notes', views.NotesViewSet, basename='notes')

urlpatterns = [
    path('place/', views.PlaceListView().as_view(), name='places'),
    path('poll/', views.PollCreateView().as_view(), name='create-poll'),
    path('poll/<int:pk>/', views.PollDetailView().as_view(), name='detail-poll'),
    path('my_poll/', views.MyPollListView().as_view(), name='my-polls'),
    path('my_events/', views.MyEventsListView().as_view(), name='my-events'),
    path('my_events/<int:id>/', views.PollsForMyEventView().as_view(), name='polls-for-my-event'),
    path('my_events/<int:id>/poll/<int:pk>/', views.UpdatePollForMyEventView().as_view(),
         name='update-poll-for-my-event'),
    path('stats_by_department/', statistics.stats_by_department, name='stats-by-department'),
    path('self-statistic/', statistics.self_statistic, name='self-stats'),
    path('general_stats/', statistics.general_statistics, name='general-statistic'),
    path('stats_for_all_departments/', statistics.stats_for_all_departments, name='stats-for-all-departments'),
    path('today_events/', views.TodayEvents().as_view(), name='today-events'),
    path('place/<int:pk>/', views.EventsInPlaceView().as_view(), name='events-in-place'),
]

urlpatterns += router.urls
