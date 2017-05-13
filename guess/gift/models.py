# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Word(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    word = models.CharField(max_length=50, blank=True, default='')

    class Meta:
        ordering = ('created',)


class Tip(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=150, blank=True, default='')
    word = models.ForeignKey(Word, blank=False)

    class Meta:
        ordering = ('created',)


@receiver(post_save, sender=User)
def create_user_word(sender, instance, created, **kwargs):
    if created:
        Word.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_word(sender, instance, **kwargs):
    instance.profile.save()