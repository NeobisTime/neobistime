from django.conf import settings
from django.db import models
from easy_thumbnails.fields import ThumbnailerImageField
from django.contrib.postgres import fields as postgres_fields


class Place(models.Model):
    """
    Model for place objects in office
    """
    name = models.CharField('Название', max_length=100)
    address = models.CharField('Адрес', max_length=180)

    class Meta:
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адреса'

    def __str__(self):
        return f'{self.name} {self.address}'


class Event(models.Model):
    """
    Model for event objects
    """
    # if event will be in Neobis office
    place = models.ForeignKey(Place, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='Адрес',
                              related_name='events')
    image = ThumbnailerImageField(upload_to="event_imgs/%Y/%m/%d/", resize_source=dict(quality=95, size=(1000, 1000)),
                                  default="event_imgs/default.png")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                              verbose_name='Организатор')
    # link for online meeting or 2gis location if needed
    link = models.URLField(max_length=250, verbose_name='Ссылка', null=True, blank=True)
    title = models.CharField(max_length=70, verbose_name='Название')
    description = models.TextField(verbose_name='Описание мероприятия', blank=True, null=True)
    start_date = models.DateTimeField(verbose_name='Начало мероприятия')
    end_date = models.DateTimeField(verbose_name='Конец мероприятия')
    deadline = models.DateTimeField(verbose_name='Дедлайн регистрации')
    # address if event will be outside the Neobis office
    address = models.CharField(max_length=70, blank=True, null=True, verbose_name='Адрес')

    class Meta:
        ordering = ['start_date']
        verbose_name = 'Ивент'
        verbose_name_plural = 'Ивенты'

    def __str__(self):
        return f'{self.title}'


class Poll(models.Model):
    """
    Model for poll objects
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                             verbose_name='Пользователь', related_name='user')
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True,
                              verbose_name='Ивент', related_name='polls')
    answer = models.NullBooleanField(null=True, blank=True,
                                     verbose_name='Ответ')
    answered_date = models.DateTimeField(auto_now=True, verbose_name='Дата ответа')
    rejection_reason = models.CharField(max_length=60, verbose_name='Причина отказа',
                                        null=True, blank=True)
    was_on_event = models.BooleanField(default=False, blank=True, null=True,
                                       verbose_name='Действительно был')

    class Meta:
        unique_together = ('user', 'event',)
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'

    def __str__(self):
        return f'{self.user}  {self.answer}'


class Attendees(models.Model):
    """
    Storing attendees, useful only for frontend part
    """
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name="attendees")
    departments = postgres_fields.ArrayField(models.IntegerField(), null=True, blank=True)
    individual_users = postgres_fields.ArrayField(models.CharField(max_length=200), blank=True, null=True)

    def __str__(self):
        return f"Departments: {self.departments}, Individual Users:{self.individual_users}"


class Notes(models.Model):
    """
    Class for personal notes of users
    """
    title = models.CharField(max_length=70, verbose_name='Название')
    description = models.TextField(verbose_name='Описание заметки', blank=True, null=True)
    start = models.DateTimeField(verbose_name='Начало события')
    end = models.DateTimeField(verbose_name='Конец события')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                              verbose_name='Владелец')

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'

    def __str__(self):
        return f'{self.title}'
