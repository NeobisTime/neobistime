from datetime import datetime, timedelta

from django.db.models import Q
from django_filters import rest_framework as filters

from events.models import Event


class RoomTimeFilter(filters.FilterSet):
    """
    Filtering events depending on room in which event take place
    """
    PERIOD_CHOICES = (
        ("week", "week"),
        ("month", "month"),
        ("year", "year"),
    )
    start = filters.ChoiceFilter(choices=PERIOD_CHOICES, method="filter_by_period")

    class Meta:
        model = Event
        fields = (
            "start"
        )

    def filter_by_period(self, queryset, name, value):
        start = datetime.datetime.now()
        end = datetime.datetime.now()

        if value == "week":
            end = start + timedelta(days=7)
        if value == "month":
            end = start + timedelta(days=31)
        if value == "year":
            end = start + timedelta(days=365)

        return queryset.filter(Q(start_date__gte=start, start_date__lte=end))
