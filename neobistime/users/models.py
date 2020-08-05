from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class Department(models.Model):
    """
    Department model. Used as a model to group user to specific group depending on their department
    """

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    """
    Model for Custom User
    """
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    phone = models.CharField(max_length=100)
    name_surname = models.CharField(blank=True, max_length=120)
    department_id = models.ForeignKey(Department, on_delete=models.SET_NULL, related_name='department', null=True)
    points = models.SmallIntegerField(verbose_name='Очки', default=0, null=True, blank=True)

    def __str__(self):
        return "{}  ".format(self.name_surname)
