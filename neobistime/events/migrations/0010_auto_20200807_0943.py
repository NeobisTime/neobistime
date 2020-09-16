# Generated by Django 2.2.6 on 2020-08-07 09:43

from django.db import migrations
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0009_event_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=easy_thumbnails.fields.ThumbnailerImageField(default='event_imgs/default.png', upload_to='event_imgs/%Y/%m/%d/'),
        ),
    ]