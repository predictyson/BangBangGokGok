# example 앱에 대한 url 설정
from django.urls import path, include
from .views import cbfAPI, cfAPI, groupsetAPI


urlpatterns = [
    path("cbf", cbfAPI),
    path("cf", cfAPI),
    path("groupset", groupsetAPI),

]