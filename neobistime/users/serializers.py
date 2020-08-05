from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from .models import CustomUser, Department
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer


class DepartmentSerializer(serializers.ModelSerializer):
    """
      Class for serializing department objects
      """

    class Meta:
        model = Department
        fields = ['id', 'name']


class CustomRegisterSerializer(RegisterSerializer):
    """
    Class for serializing Registration
    """
    name_surname = serializers.CharField(
        required=False
    )
    phone = serializers.CharField(
        required=False
    )
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['name_surname'] = self.validated_data.get('name_surname', '')
        data_dict['phone'] = self.validated_data.get('phone', '')
        data_dict['department_id'] = self.validated_data.get('department_id', '')
        return data_dict

    def create(self, validated_data):
        user = CustomUser.objects.create(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    """
      Class for serializing single user instance
      """

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name_surname', 'phone', 'department_id','points']

