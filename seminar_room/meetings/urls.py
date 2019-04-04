from django.urls import path
from meetings import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import include, url
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('meetings/', views.MeetingList.as_view()),
    path('meetings/<int:pk>/', views.MeetingDetail.as_view()),
    path('api-token-auth/', obtain_auth_token, name = 'api_token_auth'),
]

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]
