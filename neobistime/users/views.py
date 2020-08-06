from rest_framework import generics, permissions

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
