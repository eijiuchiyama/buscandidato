from django.urls import path
from . import views

urlpatterns = [
    path('politicos/', views.politicos, name='politicos'),
    path('partidos/', views.partidos, name='partidos'),
    path('integrante_partido', views.integrante_partido, name='integrante_partido')
]