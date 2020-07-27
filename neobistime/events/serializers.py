from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from django.utils import timezone
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
        # Check that event created by admins, otherwise
        # return error because usual users can't create polls
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
    place = PlaceSerializer(read_only=True, source='event.place')
    start_date = serializers.ReadOnlyField(source='event.start_date')
    end_date = serializers.ReadOnlyField(source='event.end_date')

    class Meta:
        model = Poll
        fields = ('id', 'answer', 'rejection_reason', 'event', 'place', 'start_date', 'end_date')


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
        finally:
            return 'blue'


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

    def update(self, instance, validated_data):
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
