from django.contrib import admin

from . import models


class EventAdmin(admin.ModelAdmin):
    list_filter = ('start_date', 'place')
    list_display = ('title', 'place', 'show_owner_info', 'start_date',)
    search_fields = ('^title', '^owner__name_surname',)

    def show_owner_info(self, obj):
        return f'{obj.owner} ({obj.owner.department_id})'

    show_owner_info.short_description = 'Владелец'


class PollAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'answer', 'was_on_event',)
    list_editable = ('was_on_event',)
    list_filter = ('answer', 'was_on_event',)
    list_per_page = 6
    search_fields = ('user__name_surname', 'event__title')


class NotesAdmin(admin.ModelAdmin):
    list_display = ('title', 'start', 'end', 'owner',)
    list_filter = ('start',)
    list_per_page = 15
    search_fields = ('owner__name_surname', 'title')


admin.site.register(models.Poll, PollAdmin)
admin.site.register(models.Place)
admin.site.register(models.Event, EventAdmin)
admin.site.register(models.Notes, NotesAdmin)
