from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from .models import *

def politico(request):
    queryset = Politico.objects.all()
    
    nome = request.GET.get('nome', None)
    cpf = request.GET.get('cpf', None)
    if nome:
        queryset = queryset.filter(Nome__icontains=nome)
    if cpf:
        queryset = queryset.filter(CPF__exact=cpf)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def partido(request):
    queryset = Partido.objects.all()

    nome = request.GET.get('nome', None)
    sigla = request.GET.get('sigla', None)
    lider_CPF = request.GET.get('liderCPF', None)
    sigla_exata = request.GET.get('siglaExata', None)
    if nome:
        queryset = queryset.filter(Nome__icontains=nome)
    if sigla:
        queryset = queryset.filter(Sigla_Partido__icontains=sigla)
    if lider_CPF:
        queryset = queryset.filter(Lider_Partido_CPF__exact=lider_CPF)
    if sigla_exata:
        queryset = queryset.filter(Sigla_Partido__iexact=sigla_exata)
    
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def orgao(request):
    queryset = Orgao.objects.all()

    sigla = request.GET.get('sigla', None)
    sigla_exata = request.GET.get('siglaExata', None)
    if sigla:
        queryset = queryset.filter(Sigla_Orgao__icontains=sigla)
    if sigla_exata:
        queryset = queryset.filter(Sigla_Orgao__iexact=sigla_exata)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def votacao(request):
    queryset = Votacao.objects.all()

    orgao_sigla = request.GET.get('orgaoSigla', None)
    id = request.GET.get('id', None)
    if orgao_sigla:
        queryset = queryset.filter(Sigla_Orgao__exact=orgao_sigla)
    if id:
        queryset = queryset.filter(ID_Camara_Votacao__exact=id)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def frente(request):
    queryset = Frente.objects.all()

    id = request.GET.get('id', None)
    nome = request.GET.get('nome', None)
    coordenador_cpf = request.GET.get('coordenadorCPF', None)
    if id:
        queryset = queryset.filter(ID_Camara_Frente__exact=id)
    if nome:
        queryset = queryset.filter(Nome__icontains=nome)
    if coordenador_cpf:
        queryset = queryset.filter(CPF_Coordenador__exact=coordenador_cpf)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def proposicao(request):
    queryset = Proposicao.objects.all()

    orgao_sigla = request.GET.get('orgaoSigla', None)
    id = request.GET.get('id', None)
    if orgao_sigla:
        queryset = queryset.filter(Sigla_Orgao__exact=orgao_sigla)
    if id:
        queryset = queryset.filter(ID_Camara_Proposicao__exact=id)
    
    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def despesa(request):
    queryset = Despesa.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    if politico_CPF:
        queryset = queryset.filter(CPF_Politico__exact=politico_CPF)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def profissao(request):
    queryset = Profissao.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def mandato(request):
    queryset = Mandato.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def integrante_partido(request):
    queryset = Integrante_Partido.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    sigla_partido = request.GET.get('partidoSigla', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)
    if sigla_partido:
        queryset = queryset.filter(Sigla_Partido__exact=sigla_partido)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def voto_politico(request):
    queryset = Voto_Politico.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    voto_id = request.GET.get('votoID', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)
    if voto_id:
        queryset = queryset.filter(ID_Camara_Votacao__exact=voto_id)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def votacao_proposicao(request):
    queryset = Votacao_Proposicao.objects.all()

    proposicao_id = request.GET.get('proposicaoID', None)
    voto_id = request.GET.get('votoID', None)
    if proposicao_id:
        queryset = queryset.filter(ID_Camara_Proposicao__exact=proposicao_id)
    if voto_id:
        queryset = queryset.filter(ID_Camara_Votacao__exact=voto_id)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def autor_proposicao(request):
    queryset = Autor_Proposicao.objects.all()

    proposicao_id = request.GET.get('proposicaoID', None)
    politico_CPF = request.GET.get('politicoCPF', None)
    if proposicao_id:
        queryset = queryset.filter(ID_Camara_Proposicao__exact=proposicao_id)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def integrante_orgao(request):
    queryset = Integrante_Orgao.objects.all()

    siglaOrgao = request.GET.get('orgaoSigla', None)
    politico_CPF = request.GET.get('politicoCPF', None)
    if siglaOrgao:
        queryset = queryset.filter(Sigla_Orgao__exact=siglaOrgao)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def integrante_frente(request):
    queryset = Integrante_Frente.objects.all()

    frente_id = request.GET.get('frenteID', None)
    politico_CPF = request.GET.get('politicoCPF', None)
    if frente_id:
        queryset = queryset.filter(ID_Camara_Frente__exact=frente_id)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')