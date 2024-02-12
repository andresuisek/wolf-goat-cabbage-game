from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework import generics

from .models import Rating, GameHistory
from .serializers import RatingSerializer, GameHistorySerializer


class CreateUserView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        if "username" in serializer.errors:
            user = User.objects.filter(email=request.data["email"]).last()
            if user:
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            # error_message = serializer.errors["username"][0].message
            # if error_message == "A user with that username already exists.":

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RatingListCreate(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class GameHistoryListCreate(generics.ListCreateAPIView):
    queryset = GameHistory.objects.all()
    serializer_class = GameHistorySerializer
