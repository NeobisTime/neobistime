from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from django.utils import timezone

from users.models import Department
from .models import *


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
        if data['event'].owner.is_staff():
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
    place = PlaceSerializer(read_only=True,source='event.place')
    start_date = serializers.ReadOnlyField(source='event.start_date')
    end_date = serializers.ReadOnlyField(source='event.end_date')

    class Meta:
        model = Poll
        fields = ('id', 'answer', 'rejection_reason', 'event','place','start_date','end_date')


class EventSerializer(serializers.ModelSerializer):
    """
         Class for serializing Event models
     """
    owner = serializers.ReadOnlyField(source='owner.name_surname')
    place = PlaceSerializer()
    color = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ('id', 'owner', 'title', 'description', 'deadline', 'start_date', 'end_date', 'place', 'link', 'color')

    def create(self, validated_data):
        # creating event instance
        place_data = validated_data.pop('place')
        place = Place.objects.create(**place_data)
        event = Event.objects.create(place=place, **validated_data)
        return event

    def update(self, instance, validated_data):
        # updating data about place
        place_data = validated_data.pop('place', None)
        place = instance.place
        if place_data is not None:
            instance.place.name = place_data.get('name', instance.place.name)
            instance.place.address = place_data.get('address', instance.place.address)
        # updating data about event
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.link = validated_data.get('link', instance.link)
        instance.save()
        place.save()
        return instance

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


def populate_choices():
    choice_tuple = ((i.name, i.name) for i in Department.objects.all())

    return choice_tuple


class UserNotificationSerializer(serializers.Serializer):
    """
    Serializing email notification data
    """
    departments = serializers.MultipleChoiceField(choices=populate_choices())

    def notify(self, event):
        pass
