import datetime
from django.utils import timezone
from rest_framework import generics, permissions, status, viewsets, filters
from rest_framework.exceptions import PermissionDenied, NotFound, ValidationError
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from . import permissions as custom_permissions, serializers
from .models import Event, Place, Poll
from .permissions import EventOwner
from .serializers import AdminPolls, EventCreateUpdateSerializer, EventGetSerializer, \
    MyEventListSerializer, PlaceSerializer


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

    def get_queryset(self):
        try:
            Place.objects.get(id=self.kwargs['pk'])
        except ObjectDoesNotExist:
            raise NotFound('Укажите верный id для place')
        return Event.objects.filter(place=self.kwargs['pk'])


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
            week_start -= datetime.timedelta(days=week_start.weekday())
            week_end = week_start + datetime.timedelta(days=7)
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

    def perform_create(self, serializer):
        """
        Posting current user in an owner of event
        @daniiarz:
        Sending email notification and creating polls after event creation
        :param serializer:
        :return:
        """
        if self.request.user.is_authenticated:
            event_data = serializer.save(owner=self.request.user)

            if self.request.user.is_staff:
                departments = self.request.data.get("departments", "")
                individual_users = self.request.data.get("individual_users", "")

                if not departments and not individual_users:
                    raise ValidationError("Attendees required")

                serializer = serializers.UserNotificationSerializer(
                    data={"departments": departments, "individual_users": individual_users}
                )
                serializer.is_valid(raise_exception=True)
                serializer.notify(event_data.id)

            return event_data
        else:
            raise PermissionDenied('Авторизуйтесь в системе для добавления ивентов!')

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

        if request.user.is_staff:
            event_id = instance.id

            departments = request.data.get("departments", "")
            individual_users = request.data.get("individual_users", "")

            if not departments and not individual_users:
                raise ValidationError("Attendees required")

            serializer = serializers.UserNotificationSerializer(
                data={"departments": departments, "individual_users": individual_users}
            )
            serializer.is_valid(raise_exception=True)
            serializer.notify(event_id)

        return Response({"message": "Successfully updated"}, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        attendees = instance.attendees
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
    permission_classes = (permissions.IsAuthenticated, custom_permissions.PollOwner,)


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
                          event.end_date <= now <= event.end_date + datetime.timedelta(
                              days=3)]
        return event_queryset


class PollsForMyEventView(generics.ListAPIView, ):
    """
    Return list of polls who agreed to come to event
    """
    serializer_class = AdminPolls
    permission_classes = (permissions.IsAdminUser,)

    def get_queryset(self):
        return Poll.objects.filter(event=self.kwargs['id'], answer=True).exclude(was_on_event=True)


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
        return Event.objects.filter(start_date__date=datetime.datetime.now().date())
