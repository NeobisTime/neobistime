from django.contrib.auth.base_user import BaseUserManager
from django.db import IntegrityError
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of username.
    """
    def create_user(self, email, password,phone,department_id,name_surname, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))

        if not name_surname:
            raise ValueError(_("First and Last name are required!"))

        if not phone:
            raise ValueError(_("Phone number is required"))

        if not department_id:
            raise IntegrityError("Department is required!")
        email = self.normalize_email(email)
        user = self.model(email=email,name_surname=name_surname,phone=phone,department_id=department_id, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)