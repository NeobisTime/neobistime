from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import serializers
from datetime import datetime
import pytz

from .models import Event, Place, Poll, Notes, RepeatedEvent
from .tasks import notify_users


from django.utils import timezone


class DateTimeFieldWihTZ(serializers.DateTimeField):

    def to_representation(self, value):
        value = timezone.localtime(value)
        return super(DateTimeFieldWihTZ, self).to_representation(value)


class PlaceSerializer(serializers.ModelSerializer):
    """
    Class for serializing Place models
    """

    class Meta:
        model = Place
        fields = ('id', 'name', 'address')


class PollSerializer(serializers.ModelSerializer):
    """
    Class for serializing Poll models
    """
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Poll
        fields = ('id', 'user', 'answer', 'answered_date', 'rejection_reason', 'event')

    def validate(self, data):
        """
        Check that poll answered before deadline.
        """
        # Check that event created by admins, otherwise
        # return error because usual users can't create polls
        if data['event'].owner.is_staff:
            if data['event'].deadline < timezone.now():
                raise serializers.ValidationError("Вы пропустили дедлайн!!!")
            return data
        else:
            raise serializers.ValidationError("Ивент организовал не администратор!")


class PollRetrieveUpdateSerializer(serializers.ModelSerializer):
    """
    Class for retrieving and updating poll instance.
    """
    event = serializers.ReadOnlyField(source='event.title')
    address = serializers.ReadOnlyField(source='event.address')
    place = PlaceSerializer(read_only=True, source='event.place')
    start_date = serializers.ReadOnlyField(source='event.start_date')
    end_date = serializers.ReadOnlyField(source='event.end_date')

    class Meta:
        model = Poll
        fields = ('id', 'answer', 'rejection_reason', 'event', 'address', 'place', 'start_date', 'end_date')


class EventListSerializer(serializers.ModelSerializer):
    """
    Serializing Event
    """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    start = serializers.CharField(source='start_date')
    end = serializers.CharField(source='end_date')

    class Meta:
        model = Event
        fields = (
            "title",
            "start",
            "end",
            "owner",
        )


class ParentEventSerializer(serializers.ModelSerializer):
    """
    Serializing Repeated event
    """

    class Meta:
        model = RepeatedEvent
        fields = (
            'weekdays',
            "repeated"
        )


class EventGetSerializer(serializers.ModelSerializer):
    """
    Class for serializing Event models for get method
    """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    backgroundColor = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    place = PlaceSerializer()
    my_event = serializers.SerializerMethodField()
    start = serializers.CharField(source='start_date')
    end = serializers.CharField(source='end_date')
    group_id = serializers.CharField(read_only=True, allow_null=True)
    parent_event = ParentEventSerializer(read_only=True, allow_null=True)

    class Meta:
        model = Event
        fields = (
            'id', "image", 'owner', 'department', 'title', 'description', 'deadline', 'start', 'end', 'place', 'link',
            'address', 'backgroundColor', 'my_event', "group_id", "parent_event"
        )

    def get_backgroundColor(self, obj):
        """
        Method that returns the desired color for a calendar
        depending on user, and his answer
        :param obj:
        :return color:
        """
        try:
            poll = Poll.objects.get(event=obj, user=self.context['request'].user)
            if poll.answer:
                return 'green'
            elif poll.answer is False:
                return 'red'
        except ObjectDoesNotExist:
            return 'blue'
        except TypeError:
            return 'blue'
        else:
            return 'blue'

    def get_department(self, obj):
        return str(obj.owner.department_id)

    def get_my_event(self, obj):
        return obj.owner == self.context['request'].user


class UserNotificationSerializer(serializers.Serializer):
    """
    Serializing email notification data
    """
    departments = serializers.ListField(child=serializers.IntegerField(), required=False)
    individual_users = serializers.ListField(child=serializers.EmailField(allow_blank=True), required=False, default=[])

    def notify(self, event_id, **kwargs):
        departments = self.validated_data["departments"]
        individual_users = self.validated_data["individual_users"]
        notify_users.delay(
            departments, individual_users, event_id, user_notification=kwargs.get("user_notification", True)
        )


def check_date_for_events(start, end, events):
    closest_to_start = events.filter(start_date__lt=start)
    closest_to_end = events.filter(start_date__gt=start)

    inside_events = events.filter(Q(start_date__gt=start, start_date__lt=end) |
                                  Q(end_date__gt=start, end_date__lt=end) |
                                  Q(start_date=start, end_date=end))

    existing_events = [*inside_events]

    if closest_to_start and closest_to_start.latest("start_date").end_date > start:
        existing_events.append(closest_to_start.latest("start_date"))

    if closest_to_end and closest_to_end.earliest("start_date").start_date < end:
        existing_events.append(closest_to_end.earliest("start_date"))

    return existing_events


def available_date_for_event(validated_data, **kwargs):
    """
    Checking if event violates someone's scheduled event
    :param validated_data:
    :return: information of conflict event
    """
    timezone_ = pytz.timezone('Asia/Bishkek')

    start = timezone_.localize(datetime.strptime(validated_data['start_date'], "%Y-%m-%dT%H:%M:%S"))
    end = timezone_.localize(datetime.strptime(validated_data['end_date'], "%Y-%m-%dT%H:%M:%S"))

    event_length = datetime.strptime(str(end - start), "%H:%M:%S")
    if event_length.minute < 30 and event_length.hour <= 0:
        raise serializers.ValidationError({"error": "Events can't be less than 30 minutes long."})

    place = validated_data['place']
    events = Event.objects.all().exclude(place__name="Другое")
    if place:
        if kwargs.get("update", False):
            events = events.exclude(pk=kwargs["event_id"])

        if 'Весь офис' in place.name:
            existing_events = check_date_for_events(start, end, events)
        else:
            existing_events = check_date_for_events(start, end, events.filter(place=place.pk))

        if existing_events:
            serializer = EventListSerializer(existing_events, many=True)
            raise serializers.ValidationError({"error": "place is not empty", "events": serializer.data})


class EventCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Class for serializing Event models for post and update methods
    """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    place = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), allow_null=True)
    start = serializers.CharField(source='start_date')
    end = serializers.CharField(source='end_date')

    class Meta:
        model = Event
        fields = (
            'id', "image", 'owner', 'title', 'description', 'deadline', 'start', 'end', 'place', 'link',
            'address',
        )

    def create(self, validated_data):
        available_date_for_event(validated_data)
        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        available_date_for_event(validated_data, event_id=instance.pk, update=True)
        instance.profile_img = validated_data.get("image", instance.image)
        instance.title = validated_data.get('title', instance.title)
        instance.place = validated_data.get('place', instance.place)
        instance.address = validated_data.get('address', instance.address)
        instance.description = validated_data.get('description', instance.description)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.link = validated_data.get('link', instance.link)
        instance.save()
        return instance


class RepeatedEventSerializer(serializers.ModelSerializer):
    """
    Class for creating repeatedEvent models (was created just for the purpose of convenience)
    """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    place = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), allow_null=True)
    start = DateTimeFieldWihTZ(source='start_date')
    end = DateTimeFieldWihTZ(source='end_date')

    class Meta:
        model = Event
        fields = (
            'id', "image", 'owner', 'title', 'description', 'deadline', 'start', 'end', 'place', 'link',
            'address',
        )


class MyEventListSerializer(serializers.ModelSerializer):
    """
    Class for serializing Events that related to his owner
    """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    place = PlaceSerializer()
    start = serializers.CharField(source='start_date')
    end = serializers.CharField(source='end_date')

    class Meta:
        model = Event
        fields = (
            'id', "image", 'owner', 'title', 'description', 'deadline', 'start', 'end', 'place', 'link',
            'address',
        )


class AdminPolls(serializers.ModelSerializer):
    """
    Polls for admins to mark who really came to event
    """
    user = serializers.StringRelatedField()
    department = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = ('id', 'user', 'department', 'was_on_event')

    def get_department(self, obj):
        return str(obj.user.department_id)


class NotesSerializer(serializers.ModelSerializer):
    """
    Class for serializing personal Notes of User's
    """
    owner = serializers.ReadOnlyField(source='owner.name_surname')

    def create(self, validated_data):
        return Notes.objects.create(**validated_data)

    class Meta:
        model = Notes
        fields = (
            'id', 'owner', 'title', 'description', 'start', 'end',
        )
