from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from . import serializers
from .models import CustomUser, Department


class UserListView(generics.ListAPIView):
    """
    List of all Users
    """
    queryset = CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAdminUser,)


class DepartmentListView(generics.ListAPIView):
    """
    List of all Departments
    """
    queryset = Department.objects.all()
    serializer_class = serializers.DepartmentSerializer
    permission_classes = (permissions.AllowAny,)


@api_view(["POST"])
@permission_classes([AllowAny])
def is_user_staff(request):
    """
    returns true if user is an admin
    :param request: token
    :return: json {"is_staff":true/false}
    """
    try:
        token = request.data['token']
        user = Token.objects.get(key=token).user
    except KeyError:
        return JsonResponse({"error": "enter a parameter 'token'"})
    except ObjectDoesNotExist:
        return JsonResponse({"error": "User не найден! Введите корректный токен"})
    return JsonResponse({"is_staff": user.is_staff})
