from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("/user", include("app.system.urls")),
    path("/seach", include("search.urls"))
]
