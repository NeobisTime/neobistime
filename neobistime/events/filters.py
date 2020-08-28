from datetime import timedelta

from django.db.models import Q
from django_filters import rest_framework as filters
from delorean import Delorean

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
    period = filters.ChoiceFilter(choices=PERIOD_CHOICES, method="filter_by_period", field_name="start")

    class Meta:
        model = Event
        fields = (
            "period",
        )

    def filter_by_period(self, queryset, name, value):
        d = Delorean(timezone="Asia/Bishkek")
        start = d.datetime
        end = start

        if value == "week":
            end = d.next_sunday().datetime
        if value == "month":
            end = (d.next_month().truncate("month") - timedelta(days=1)).datetime
        if value == "year":
            end = (d.next_year().truncate("year") - timedelta(days=1)).datetime

        return queryset.filter(Q(start_date__gte=start, start_date__lte=end))
