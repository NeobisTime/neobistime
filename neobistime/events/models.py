from django.conf import settings
from django.db.models import signals
from django.db import models


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


def save_profile(sender, instance, **kwargs):
    if instance.was_on_event:
        instance.user.points += 10
        instance.user.save()


signals.post_save.connect(receiver=save_profile, sender=Poll)
