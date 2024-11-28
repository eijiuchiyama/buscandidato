from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from .models import *

def politico(request):
    queryset = Politico.objects.all()
    
    nome = request.GET.get('nome', None)
    if nome:
        queryset = queryset.filter(Nome__icontains=nome)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def partido(request):
    queryset = Partido.objects.all()

    nome = request.GET.get('nome', None)
    sigla = request.GET.get('sigla', None)
    if nome:
        queryset = queryset.filter(Nome__icontains=nome)
    if sigla:
        queryset = queryset.filter(Sigla_Partido__icontains=sigla)
    
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def orgao(request):
    queryset = Orgao.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def votacao(request):
    queryset = Votacao.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def frente(request):
    queryset = Frente.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def proposicao(request):
    queryset = Proposicao.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def despesa(request):
    queryset = Despesa.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def profissao(request):
    queryset = Profissao.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def mandato(request):
    queryset = Mandato.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def integrante_partido(request):
    queryset = Integrante_Partido.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def voto_politico(request):
    queryset = Voto_Politico.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def votacao_proposicao(request):
    queryset = Votacao_Proposicao.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def autor_proposicao(request):
    queryset = Autor_Proposicao.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def integrante_orgao(request):
    queryset = Integrante_Orgao.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def integrante_frente(request):
    queryset = Integrante_Frente.objects.all()
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')