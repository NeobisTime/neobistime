import datetime
import math
from allauth.account.admin import EmailAddress
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import NotFound
from .models import Event, Poll
from users.models import Department, CustomUser
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.utils import timezone


@api_view(["POST"])
@permission_classes([IsAdminUser])
def stats_by_department(request):
    """
    Returns Json for department with next data:
    1)quantity of events
    2)quantity of students
    3)average attendance
    4)average number of people per event

    :param request:
     department_id - Integer (required),
     month - integer (required) ,
     year - bool (required)
    :return: json with statistic data
    """
    data = {}
    try:
        department = request.data['department_id']
        Department.objects.get(id=department)
        data = {
            "quantity_of_students_by_departments": len(
                CustomUser.objects.filter(department_id=department))
        }
    except ObjectDoesNotExist:
        raise NotFound(detail='Department does not exist')

    poll_queryset = Poll.objects.filter(user__department_id=department)
    event_queryset = Event.objects.filter(owner__department_id=department)
    try:
        month = request.data['month']
        year = request.data['year']
        if not (1 <= month <= 12):
            raise NotFound(detail='Укажите месяц от 1 до 12')
    except TypeError:
        pass
    except KeyError:
        raise NotFound(detail='Укажите параметры month(int), year(bool)')
    if month is not None:
        event_queryset = event_queryset.filter(start_date__month=month)
        poll_queryset = poll_queryset.filter(answered_date__month=month)
    elif year:
        year = timezone.now().year
        event_queryset = event_queryset.filter(start_date__year=year)
        poll_queryset = poll_queryset.filter(answered_date__year=year)
    data["quantity_of_events_by_departments"] = len(event_queryset)
    # для подсчета среднего посещения мероприятий по
    # департаменту в процентах, нужно:
    # средняя посещаемость(%) = (количество людей кто
    # действительно пришел * 100(процентов))/
    # количество приглашенных людей
    polls = len(poll_queryset)
    agreed_polls = len(poll_queryset.filter(was_on_event=True))
    try:
        data["average_attendance"] = math.ceil(agreed_polls * 100 / polls)
    except ZeroDivisionError:
        data["average_attendance"] = 0
    # для подсчета среднего количества людей на один ивент нужно
    # найти количество людей кто пришел на ивент,
    # организованный данным департаментом,
    # и разделить на количество мероприятий
    applied_polls = []
    for event in event_queryset:
        was_on_event_polls = event.polls.prefetch_related('polls').filter(was_on_event=True).count()
        applied_polls.append(was_on_event_polls)
    try:
        data["average_number_of_people_per_event"] = sum(applied_polls) // len(applied_polls)
    except ZeroDivisionError:
        data["average_number_of_people_per_event"] = 0
    return JsonResponse(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def self_statistic(request):
    """
    Returns statistic data filtered by current user
    :param request:
    ?period (options: week,month,year)
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
    elif request.query_params.get('period') == 'year':
        year = timezone.now().year
        poll_queryset = Poll.objects.filter(answered_date__year=year)
    stats = {
        "quantity_of_polls": len(poll_queryset.filter(user=request.user)),
        "quantity_of_attended_events": len(poll_queryset.filter(user=request.user).filter(was_on_event=True))
    }
    stats["quantity_of_missed_events"] = stats["quantity_of_polls"] - stats["quantity_of_attended_events"]
    return JsonResponse(stats)


@api_view(["GET", ])
@permission_classes([IsAdminUser])
def general_statistics(request):
    """
    Returns statistic data like:
    1) Quantity of registered people
    2) Quantity of all events
    3) percentage of attendance at events
    4) average number of people per event
    :param request:
    :return: json
    """
    stats = {
        "quantity_of_people": len(EmailAddress.objects.filter(verified=True)),
        "quantity_of_all_events": len(Event.objects.all()),
    }
    # average number of people per event
    # getting all polls that was marked as True by admin
    applied_polls = []
    for event in Event.objects.all():
        was_on_event_polls = event.polls.prefetch_related('polls').filter(was_on_event=True).count()
        applied_polls.append(was_on_event_polls)
    try:
        stats["average_number_of_people_per_event"] = sum(applied_polls) // len(applied_polls)
    except ZeroDivisionError:
        stats["average_number_of_people_per_event"] = 0
    # percentage of attendance at events
    # taking all polls with True answer from users and
    # count polls that is really came to event
    agreed_polls = len(Poll.objects.filter(answer=True))
    really_came = len(Poll.objects.filter(was_on_event=True))
    if agreed_polls != 0:
        stats["percentage_of_attendance_at_events"] = really_came * 100 // agreed_polls
    else:
        stats["percentage_of_attendance_at_events"] = 0
    return JsonResponse(stats)


@api_view(["GET", ])
@permission_classes([IsAdminUser])
def stats_for_all_departments(request):
    """
    Returns quantity of events by all departments
    :param request:
    :return: json
    """
    stats = {}
    for department in Department.objects.all():
        stats[str(department)] = len(
            Event.objects.all().filter(owner__department_id=department))
    return JsonResponse(stats)
