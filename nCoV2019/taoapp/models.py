#!/usr/bin/env python
from django.db import models


class onedatasql(models.Model):
    one = models.CharField(max_length=16000)
    def __str__(self):
        return self.one



class twodatasql(models.Model):
    two = models.CharField(max_length=16000)

    def __str__(self):
        return self.two



class threedatasql(models.Model):
    three = models.CharField(max_length=16000)

    def __str__(self):
        return self.three

class Users(models.Model):
    name = models.CharField(max_length=30, verbose_name='姓名')
    phone = models.CharField(max_length=11, verbose_name='手机')
    qq = models.CharField(max_length=15, null=True, blank=True, verbose_name='QQ')
    wechat = models.CharField(max_length=30, null=True, blank=True, verbose_name='微信')
    address = models.CharField(null=True, max_length=100, blank=True, verbose_name='地址')
    source = models.CharField(null=True, max_length=30, blank=True, verbose_name='来源')
    know_choice = ((1, '搜索引擎'), (2, '线下活动'),)
    know = models.SmallIntegerField(null=True, choices=know_choice, verbose_name='了解')
    reg_time = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='注册时间')

class imagesql(models.Model):
    img = models.ImageField(upload_to='img')
    neme = models.CharField(max_length=4)

    def __str__(self):
        return self.name


