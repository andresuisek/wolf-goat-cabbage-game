from django.db import models
from django.contrib.auth.models import User


class GameHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game_time = models.IntegerField()
    level = models.IntegerField()
    won = models.BooleanField()
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
