# Generated by Django 2.2.6 on 2020-07-26 22:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_auto_20200722_0257'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ['start_date'], 'verbose_name': 'Ивент', 'verbose_name_plural': 'Ивенты'},
        ),
        migrations.AddField(
            model_name='event',
            name='address',
            field=models.CharField(blank=True, max_length=70, null=True, verbose_name='Адрес'),
        ),
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='Описание мероприятия'),
        ),
        migrations.AlterField(
            model_name='event',
            name='place',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='events.Place', verbose_name='Адрес'),
        ),
    ]
