from django.urls import path
from . import views

urlpatterns = [
    path('', views.mock_api),
]