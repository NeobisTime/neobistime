from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from django.utils import timezone
from .models import *
from django.db.models import Q


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


class EventGetSerializer(serializers.ModelSerializer):
    """
         Class for serializing Event models for get method
     """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    color = serializers.SerializerMethodField()
    place = PlaceSerializer()

    class Meta:
        model = Event
        fields = (
            'id', 'owner', 'title', 'description', 'deadline', 'start_date', 'end_date', 'place', 'link', 'address',
            'color')

    def get_color(self, obj):
        """
        Method that returns the desired color for calendar
        depending on user and his answer
        :param obj:
        :return color:
        """
        try:
            poll = Poll.objects.get(event=obj, user=self.context['request'].user)
            if poll.answer:
                return 'green'
            elif poll.answer == False:
                return 'red'
        except ObjectDoesNotExist:
            return 'blue'
        else:
            return 'blue'


def available_date_for_event(validated_data):
    """
    Checking if event violates someone's scheduled event
    :param validated_data:
    :return: information of conflict event
    """
    try:
        start = validated_data['start_date']
        end = validated_data['end_date']
        # list contains events that already exist in this time
        event = []
        filter_params = dict(start_date__lte=end, end_date__gte=start)
        # only checking events that take place in the office
        if 'Маленькая' in validated_data['place'].name:
            event = Event.objects.filter(Q(place__name='Маленькая комната') | Q(place__name='Весь офис'),
                                         **filter_params)
        elif 'Большая' in validated_data['place'].name:
            event = Event.objects.filter(Q(place__name='Большая комната') | Q(place__name='Весь офис'), **filter_params)
        elif 'Весь' in validated_data['place'].name:
            event = Event.objects.filter(**filter_params).exclude(place__name='Другое')
        if event:
            raise serializers.ValidationError({"Error": "place is not empty",
                                               "Event title": event[0].title,
                                               "Place": event[0].place.name,
                                               "start": event[0].start_date,
                                               "end": event[0].end_date})
    except KeyError:
        pass


class EventCreateUpdateSerializer(serializers.ModelSerializer):
    """
         Class for serializing Event models for post and update methods
     """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    place = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all())

    class Meta:
        model = Event
        fields = (
            'id', 'owner', 'title', 'description', 'deadline', 'start_date', 'end_date', 'place', 'link', 'address',
        )

    def create(self, validated_data):
        available_date_for_event(validated_data)

        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.place = validated_data.get('place', instance.place)
        instance.address = validated_data.get('address', instance.address)
        instance.description = validated_data.get('description', instance.description)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.link = validated_data.get('link', instance.link)
        available_date_for_event(validated_data)
        instance.save()
        return instance


class MyEventListSerializer(serializers.ModelSerializer):
    """
         Class for serializing Events that related to his owner
     """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    place = PlaceSerializer()

    class Meta:
        model = Event
        fields = (
            'id', 'owner', 'title', 'description', 'deadline', 'start_date', 'end_date', 'place', 'link', 'address',
        )


class AdminPolls(serializers.ModelSerializer):
    """
    Polls for admins to mark who really came to event
    """
    user = serializers.StringRelatedField()

    class Meta:
        model = Poll
        fields = ('id', 'user', 'was_on_event')



class EventsInPlaceSerializer(serializers.ModelSerializer):
    events = EventGetSerializer(many=True,read_only=True)


    class Meta:
        model = Place
        fields =('id','name','address','events')