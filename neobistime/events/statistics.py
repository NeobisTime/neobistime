import math
from .models import *
from users.models import *
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser


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
                "quantity_of_events_by_departments": len(
                    Event.objects.filter(owner__department_id=department)),
                "quantity_of_students_by_departments": len(
                    CustomUser.objects.filter(department_id=department))
            }
            # для подсчета среднего посещения мероприятий по департаментам в процентах, нужно:
            #                           (количество людей кто действительно пришел * 100(процентов))
            # средняя посещаемость(%) = ------------------------------------------------------------
            #                                        количество приглашенных людей
            polls = len(Poll.objects.filter(user__department_id=department))
            agreed_polls = len(Poll.objects.filter(user__department_id=department).filter(was_on_event=True))
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
    stats = {
        "quantity_of_polls": len(Poll.objects.filter(user=request.user)),
        "quantity_of_attended_events": len(Poll.objects.filter(user=request.user).filter(was_on_event=True))
    }
    stats["quantity_of_missed_events"] = stats["quantity_of_polls"] - stats["quantity_of_attended_events"]
    return JsonResponse(stats)
