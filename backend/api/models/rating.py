from django.db import models
from django.contrib.auth.models import User


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.IntegerField()
    rate = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
