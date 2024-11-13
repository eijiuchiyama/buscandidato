from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from .models import Politico, Partido, Integrante_Partido

def politicos(request):
    queryset = Politico.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def partidos(request):
    queryset = Partido.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def integrante_partido(request):
    queryset = Integrante_Partido.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')