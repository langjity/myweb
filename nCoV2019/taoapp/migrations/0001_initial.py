# Generated by Django 3.0.2 on 2020-03-18 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='imagesql',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='img')),
                ('neme', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='onedatasql',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('one', models.CharField(max_length=16000)),
            ],
        ),
        migrations.CreateModel(
            name='threedatasql',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('three', models.CharField(max_length=16000)),
            ],
        ),
        migrations.CreateModel(
            name='twodatasql',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('two', models.CharField(max_length=16000)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='姓名')),
                ('phone', models.CharField(max_length=11, verbose_name='手机')),
                ('qq', models.CharField(blank=True, max_length=15, null=True, verbose_name='QQ')),
                ('wechat', models.CharField(blank=True, max_length=30, null=True, verbose_name='微信')),
                ('address', models.CharField(blank=True, max_length=100, null=True, verbose_name='地址')),
                ('source', models.CharField(blank=True, max_length=30, null=True, verbose_name='来源')),
                ('know', models.SmallIntegerField(choices=[(1, '搜索引擎'), (2, '线下活动')], null=True, verbose_name='了解')),
                ('reg_time', models.DateTimeField(auto_now_add=True, verbose_name='注册时间')),
            ],
        ),
    ]
