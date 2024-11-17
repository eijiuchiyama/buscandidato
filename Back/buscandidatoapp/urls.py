from django.urls import path
from . import views

urlpatterns = [
    path('api/politicos/', views.politicos, name='politicos'),
    path('api/partidos/', views.partidos, name='partidos'),
    path('api/integrante_partido/', views.integrante_partido, name='integrante_partido')
]