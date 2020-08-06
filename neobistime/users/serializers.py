from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from .models import CustomUser, Department


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
    profile_img = serializers.ImageField()

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict["profile_img"] = self.validated_data.get("profile_img", "")
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
        fields = ['id', "profile_img", 'email', 'name_surname', 'phone', 'department_id']
