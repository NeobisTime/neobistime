import re
from datetime import datetime, timedelta

import pytz
from django.conf import settings
from django.utils import timezone
from django_filters import rest_framework as django_filters
from rest_framework import filters, generics, permissions, status, viewsets
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from . import permissions as custom_permissions, serializers
from .filters import RoomTimeFilter
from .models import Event, Notes, Place, Poll
from .permissions import EventOwner
from .serializers import AdminPolls, EventCreateUpdateSerializer, EventGetSerializer, MyEventListSerializer, \
    NotesSerializer, PlaceSerializer, EventListSerializer
from .tasks import create_repeated_events

timezone_ = pytz.timezone(settings.TIME_ZONE)


class PlaceListView(generics.ListAPIView):
    """
    get:
    Return list of place objects.
    """
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = (permissions.IsAuthenticated,)


class EventsInPlaceView(generics.ListAPIView):
    """
    Returns all events based on chosen place
    """
    serializer_class = EventGetSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (django_filters.DjangoFilterBackend,)
    filter_class = RoomTimeFilter

    def get_queryset(self):
        place = get_object_or_404(Place, pk=self.kwargs.get("pk", ""))
        return Event.objects.filter(place=place.id).filter(end_date__gte=timezone.now())


class EventViewSet(viewsets.ModelViewSet):
    """
    list: List of events created by admins
    query parameters:
    1) ?search (by title)
    2) ?period (options:day,week,month)
    also possible to combine these parameters by next syntax:?search=rest&period=month

    retrieve: Retrieve single event object

    update: Update single event object

    create: Create single event object

    partial_update: single event object

    destroy: Delete single event object
    """
    search_fields = ['title', ]
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        queryset = Event.objects.filter(owner__is_staff=True)
        if self.request.query_params.get('period') == 'day':
            day = timezone.now().day
            queryset = queryset.filter(start_date__day=day)
        elif self.request.query_params.get('period') == 'week':
            week_start = timezone.now()
            week_start -= timedelta(days=week_start.weekday())
            week_end = week_start + timedelta(days=7)
            queryset = queryset.filter(start_date__gte=week_start, start_date__lt=week_end)
        elif self.request.query_params.get('period') == 'month':
            month_start = timezone.now().month
            queryset = queryset.filter(start_date__month=month_start)
        return queryset

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [permissions.IsAuthenticated, ]
        else:
            permission_classes = [EventOwner, ]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        """
        Method that returns specific serializer for event objects
        depending on request method
        :return:
        """
        if self.request.method == 'GET':
            return EventGetSerializer
        else:
            return EventCreateUpdateSerializer

    def destroy(self, request, *args, **kwargs):
		instance = self.get_object()
		self.perform_destroy(instance)
		return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer, **kwargs):
        """
        Posting current user in an owner of event
        @daniiarz:
        Sending email notification and creating polls after event creation
        :param serializer:
        :return:
        """
		departments_list = list(map(int, re.findall("\d+", self.request.data.get("departments", ""))))  # noqa
		users_list = self.request.data.get("individual_users", "").split(",")

		if len(departments_list) == 0 and len(users_list) == 0:
			raise ValidationError("Attendees required")

		event_data = serializer.save(owner=self.request.user)
		serializer = serializers.UserNotificationSerializer(
			data={"departments": departments_list, "individual_users": users_list}
		)
		serializer.is_valid(raise_exception=True)
		serializer.notify(event_data.id, user_notification=True)

        return event_data

    def update(self, request, *args, **kwargs):
        """
        Default update plus creation of poll
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

		departments_list = list(map(int, re.findall("\d+", request.data.get("departments", ""))))  # noqa
		users_list = request.data.get("individual_users", "").split(",")

		if len(departments_list) < 1 and len(users_list) < 1:
			try:
				departments_list = instance.attendees.departments
				users_list = instance.attendees.individual_users
			except Exception:
				raise ValidationError("Attendees were not given or improperly created event")

		serializer = serializers.UserNotificationSerializer(
			data={"departments": departments_list, "individual_users": users_list}
		)
		serializer.is_valid(raise_exception=True)
		serializer.notify(instance.id)

        return Response({"message": "Successfully updated"}, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        attendees = instance.attendees111
        return Response(
            {**serializer.data,
             "attendees": {"departments": attendees.departments, "individual_users": attendees.individual_users}}
        )


class PollCreateView(generics.CreateAPIView):
    """
    post:
    Create poll
    """
    queryset = Poll.objects.all()
    serializer_class = serializers.PollSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            return serializer.save(user=self.request.user)
        else:
            raise PermissionDenied('Авторизуйтесь в системе для ответов на опросник!')


class PollDetailView(generics.RetrieveUpdateAPIView):
    """
    get:
    Return single event instance.

    patch:
    Update single event instance.
    """
    queryset = Poll.objects.all()
    serializer_class = serializers.PollRetrieveUpdateSerializer
    permission_classes = (permissions.IsAdminUser, custom_permissions.PollOwner,)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class MyPollListView(generics.ListAPIView):
    """
    Return list of created polls filtered by user
    """
    serializer_class = serializers.PollRetrieveUpdateSerializer
    permission_classes = (permissions.IsAuthenticated, custom_permissions.PollOwner,)

    def get_queryset(self):
        return Poll.objects.filter(user=self.request.user)


class MyEventsListView(generics.ListAPIView):
    """
    Return list of created events filtered by user
    """
    serializer_class = MyEventListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        # shows user's events that ended in range of 3 days from now
        now = timezone.now()
        event_queryset = Event.objects.filter(owner=self.request.user)
        event_queryset = [event for event in event_queryset if
                          event.end_date <= now <= event.end_date + timedelta(days=3)
                          ]
        return event_queryset


class PollsForMyEventView(generics.ListAPIView, ):
    """
    Return list of polls who agreed to come to event
    """
    serializer_class = AdminPolls
    permission_classes = (permissions.IsAdminUser,)

    def get_queryset(self):
        return Poll.objects.filter(event=self.kwargs['id'], answer=True)


class UpdatePollForMyEventView(generics.RetrieveUpdateAPIView):
    """
    Updating polls if person came to event
    """
    queryset = Poll.objects.all()
    serializer_class = AdminPolls
    permission_classes = (permissions.IsAdminUser,)


class TodayEvents(generics.ListAPIView):
    """
    Return list of today's events
    """
    serializer_class = EventGetSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Event.objects.filter(start_date__date=datetime.now().date())


class NotesViewSet(viewsets.ModelViewSet):
    """
    list: List of notes created by users
    query parameters:
    1) ?search (by title)

    retrieve: Retrieve single note object

    update: Update single note object

    create: Create single note object

    partial_update: single note object

    destroy: Delete single note object
    """
    search_fields = ['title', ]
    filter_backends = (filters.SearchFilter,)
    serializer_class = NotesSerializer

    def get_queryset(self):
        return Notes.objects.filter(owner=self.request.user)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [permissions.IsAuthenticated, ]
        else:
            permission_classes = [custom_permissions.NotesOwner, ]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            return serializer.save(owner=self.request.user)
        else:
            raise PermissionDenied('Авторизуйтесь в системе для \
            создания заметок!')


class NotificationEvents(generics.ListAPIView):
    """
    Class for showing notifications of NOT ended events
    query parameters:
    1) ?search (by title)
    2) ?period (options:day,week,month)
    also possible to combine these parameters by next syntax:?search=rest&period=month
    """
    serializer_class = EventGetSerializer
    permission_classes = (permissions.IsAuthenticated,)
    search_fields = ['title', ]
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        queryset = Event.objects.filter(owner__is_staff=True)
        if self.request.query_params.get('period') == 'day':
            day = timezone.now().day
            queryset = queryset.filter(start_date__day=day)
        elif self.request.query_params.get('period') == 'week':
            week_start = timezone.now()
            week_start -= timedelta(days=week_start.weekday())
            week_end = week_start + timedelta(days=7)
            queryset = queryset.filter(start_date__gte=week_start, start_date__lt=week_end)
        elif self.request.query_params.get('period') == 'month':
            month_start = timezone.now().month
            queryset = queryset.filter(start_date__month=month_start)
        return queryset.filter(end_date__gt=timezone.now())


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_attending_events(request):
	events = Event.objects.filter(polls__answer=True)
	serializer = EventListSerializer(events)
	return Response(serializer.data, status=status.HTTP_200_OK)