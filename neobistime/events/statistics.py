import math
from .models import Event, Poll
from users.models import Department, CustomUser
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import datetime
from django.utils import timezone


@api_view(["GET"])
@permission_classes([IsAdminUser])
def statistic_for_all_departments(request):
    """
    Returns Json for all departments with next data:
    1)quantity of events
    2)quantity of students by departments
    1)average attendance
    :param request:
    :return: json with statistic data
    """
    stats = {}
    for department in Department.objects.all():
        try:
            data = {
                "quantity_of_students_by_departments": len(
                    CustomUser.objects.filter(department_id=department))
            }
            # для подсчета среднего посещения мероприятий по
            # департаментам в процентах, нужно:
            # средняя посещаемость(%) = (количество людей кто
            # действительно пришел * 100(процентов))/
            # количество приглашенных людей
            poll_queryset = Poll.objects.all()
            event_queryset = Event.objects.all()
            # override queryset of polls and event
            if request.query_params.get('period') == 'week':
                week_start = timezone.now()
                week_start -= datetime.timedelta(days=week_start.weekday())
                week_end = week_start + datetime.timedelta(days=7)
                event_queryset = Event.objects.filter(start_date__gte=week_start, start_date__lt=week_end)
                poll_queryset = Poll.objects.filter(answered_date__gte=week_start, answered_date__lt=week_end)
            elif request.query_params.get('period') == 'month':
                month_start = timezone.now().month
                event_queryset = Event.objects.filter(start_date__month=month_start)
                poll_queryset = Poll.objects.filter(answered_date__month=month_start)

            elif request.query_params.get('period') == 'quarter':
                quarter_start = timezone.now().month
                event_queryset = Event.objects.filter(start_date__month__gte=quarter_start,
                                                      start_date__month__lt=quarter_start + 3)
                poll_queryset = Poll.objects.filter(answered_date__month__gte=quarter_start,
                                                    answered_date__month__lt=quarter_start + 3)
            elif request.query_params.get('period') == 'year':
                year = timezone.now().year
                event_queryset = Event.objects.filter(start_date__year=year)
                poll_queryset = Poll.objects.filter(answered_date__year=year)

            data["quantity_of_events_by_departments"] = len(
                event_queryset.filter(owner__department_id=department))

            polls = len(poll_queryset.filter(user__department_id=department))
            agreed_polls = len(poll_queryset.filter(user__department_id=department).filter(was_on_event=True))
            data["average_attendance"] = math.ceil(agreed_polls * 100 / polls)
        except ZeroDivisionError:
            data["average_attendance"] = 0
        finally:
            stats[str(department)] = data
    return JsonResponse(stats)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def self_statistic(request):
    """
    Returns statistic data filtered by current user
    :param request:
    :return: json with statistic data
    """
    poll_queryset = Poll.objects.all()
    if request.query_params.get('period') == 'week':
        week_start = timezone.now()
        week_start -= datetime.timedelta(days=week_start.weekday())
        week_end = week_start + datetime.timedelta(days=7)
        poll_queryset = Poll.objects.filter(answered_date__gte=week_start, answered_date__lt=week_end)
    elif request.query_params.get('period') == 'month':
        month_start = timezone.now().month
        poll_queryset = Poll.objects.filter(answered_date__month=month_start)

    elif request.query_params.get('period') == 'quarter':
        quarter_start = timezone.now().month
        poll_queryset = Poll.objects.filter(answered_date__month__gte=quarter_start,
                                            answered_date__month__lt=quarter_start + 3)
    elif request.query_params.get('period') == 'year':
        year = timezone.now().year
        poll_queryset = Poll.objects.filter(answered_date__year=year)
    stats = {
        "quantity_of_polls": len(poll_queryset.filter(user=request.user)),
        "quantity_of_attended_events": len(poll_queryset.filter(user=request.user).filter(was_on_event=True))
    }
    stats["quantity_of_missed_events"] = stats["quantity_of_polls"] - stats["quantity_of_attended_events"]
    return JsonResponse(stats)
