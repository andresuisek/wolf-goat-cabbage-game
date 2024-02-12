from django.urls import path
from .views import CreateUserView, RatingListCreate, GameHistoryListCreate

urlpatterns = [
    path("create_user/", CreateUserView.as_view(), name="create_user"),
    path("ratings/", RatingListCreate.as_view(), name="rating-list"),
    path("gamehistory/", GameHistoryListCreate.as_view(), name="gamehistory-list"),
]
