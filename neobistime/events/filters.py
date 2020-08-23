from datetime import datetime

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
    period = filters.ChoiceFilter(choices=PERIOD_CHOICES, method="filter_by_period")

    class Meta:
        model = Event
        fields = (
            "period"
        )

    def filter_by_period(self, queryset, name, value):
        if value == "week":
            start = datetime.datetime.now()
        if value == "month":
            pass
        if value == "year":
            pass

        # return queryset.filter(Q(start_date__gte=start, start_date__lte=end)
