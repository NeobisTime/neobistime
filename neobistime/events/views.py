from rest_framework import generics, status, viewsets
from rest_framework.exceptions import PermissionDenied
from .serializers import *
from rest_framework import permissions
from .permissions import *


class PlaceListView(generics.ListAPIView):
    """
    get:
    Return list of place objects.

    """
    queryset = Place.objects.all()
    serializer_class = EventsInPlaceSerializer
    # serializer_class = PlaceSerializer
    permission_classes = (permissions.IsAuthenticated,)


class EventViewSet(viewsets.ModelViewSet):
    """
    list: List of events

    retrieve: Retrieve single event object

    update: Update single event object

    create: Create single event object

    partial_update: single event object

    destroy: Delete single event object
    """

    def get_queryset(self):
        return Event.objects.filter(owner__is_staff=True)

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
        Posting current user in owner og event
        :param serializer:
        :return:
        """
        if self.request.user.is_authenticated:
            return serializer.save(owner=self.request.user)
        else:
            raise PermissionDenied('Авторизуйтесь в системе для добавления ивентов!')


class PollCreateView(generics.CreateAPIView):
    """
    post:
    Create poll
    """
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
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
    serializer_class = PollRetrieveUpdateSerializer
    permission_classes = (permissions.IsAuthenticated, PollOwner,)


class MyPollListView(generics.ListAPIView):
    """
    Return list of created polls filtered by user
    """
    serializer_class = PollRetrieveUpdateSerializer
    permission_classes = (permissions.IsAuthenticated, PollOwner,)

    def get_queryset(self):
        return Poll.objects.filter(user=self.request.user)


class MyEventsListView(generics.ListAPIView):
    """
    Return list of created events filtered by user
    """
    serializer_class = MyEventListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Event.objects.filter(owner=self.request.user)


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
