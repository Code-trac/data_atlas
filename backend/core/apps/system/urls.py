from django.contrib import admin
from django.urls import path, include
import views


urlpatterns = [
    path("user", views.user, name = "userpage"), 
    path("password", views.password, name = "Password"),
]

