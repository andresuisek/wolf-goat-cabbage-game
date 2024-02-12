from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Rating, GameHistory


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "email"]
        # extra_kwargs = {"password": {"write_only": True}}


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "user", "level", "rate", "date"]


class GameHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameHistory
        fields = ["id", "user", "game_time", "level", "won", "date"]
