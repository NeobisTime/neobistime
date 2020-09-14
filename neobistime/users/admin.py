from django.contrib import admin

from . import models


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('name_surname', 'department_id', 'phone', 'email', 'points',)
    search_fields = ('name_surname', 'email', 'phone')
    list_filter = ('department_id',)
    ordering = ('points',)
    list_per_page = 15


admin.site.register(models.Department)
admin.site.register(models.CustomUser, CustomUserAdmin)
