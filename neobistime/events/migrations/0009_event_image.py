# Generated by Django 2.2.6 on 2020-08-05 14:28

from django.db import migrations
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0008_auto_20200805_0623'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='image',
            field=easy_thumbnails.fields.ThumbnailerImageField(default='event_imgs/default.jpg', upload_to='event_imgs/%Y/%m/%d/'),
        ),
    ]
