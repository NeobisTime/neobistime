from rest_framework import generics, permissions

from .serializers import *
from .models import CustomUser


class UserListView(generics.ListAPIView):
    """
    List of all Users
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)
