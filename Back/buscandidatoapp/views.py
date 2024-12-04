from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.core.paginator import Paginator
from .models import *

def pos_processo(queryset, request):
    itens = request.GET.get('itens', None)
    pagina = request.GET.get('pagina', None)
    if itens:
        itens = int(itens)
        p = Paginator(queryset, itens)
        if pagina:
            pagina = int(pagina)
            if pagina > p.num_pages or pagina < 1:
                queryset = []
            else:
                queryset = p.page(pagina)
        else:
            queryset = p.page(1)

    data = serializers.serialize("json", queryset)
    return HttpResponse(data, content_type='application/json')

def politico(request):
    queryset = Politico.objects.all()
    
    nome = request.GET.get('nome', None)
    cpf = request.GET.get('cpf', None)
    if nome:
        queryset = queryset.filter(Nome__icontains=nome)
    if cpf:
        queryset = queryset.filter(CPF__exact=cpf)

    return pos_processo(queryset, request)

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
    
    return pos_processo(queryset, request)

def orgao(request):
    queryset = Orgao.objects.all()

    sigla = request.GET.get('sigla', None)
    sigla_exata = request.GET.get('siglaExata', None)
    if sigla:
        queryset = queryset.filter(Sigla_Orgao__icontains=sigla)
    if sigla_exata:
        queryset = queryset.filter(Sigla_Orgao__iexact=sigla_exata)

    return pos_processo(queryset, request)

def votacao(request):
    queryset = Votacao.objects.all()

    orgao_sigla = request.GET.get('orgaoSigla', None)
    id = request.GET.get('id', None)
    if orgao_sigla:
        queryset = queryset.filter(Sigla_Orgao__exact=orgao_sigla)
    if id:
        queryset = queryset.filter(ID_Camara_Votacao__exact=id)

    return pos_processo(queryset, request)

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

    return pos_processo(queryset, request)

def proposicao(request):
    queryset = Proposicao.objects.all()

    orgao_sigla = request.GET.get('orgaoSigla', None)
    id = request.GET.get('id', None)
    if orgao_sigla:
        queryset = queryset.filter(Sigla_Orgao__exact=orgao_sigla)
    if id:
        queryset = queryset.filter(ID_Camara_Proposicao__exact=id)
    
    return pos_processo(queryset, request)

def despesa(request):
    queryset = Despesa.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    if politico_CPF:
        queryset = queryset.filter(CPF_Politico__exact=politico_CPF)

    return pos_processo(queryset, request)

def profissao(request):
    queryset = Profissao.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    return pos_processo(queryset, request)

def mandato(request):
    queryset = Mandato.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    return pos_processo(queryset, request)

def integrante_partido(request):
    queryset = Integrante_Partido.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    sigla_partido = request.GET.get('partidoSigla', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)
    if sigla_partido:
        queryset = queryset.filter(Sigla_Partido__exact=sigla_partido)

    return pos_processo(queryset, request)

def voto_politico(request):
    queryset = Voto_Politico.objects.all()

    politico_CPF = request.GET.get('politicoCPF', None)
    voto_id = request.GET.get('votoID', None)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)
    if voto_id:
        queryset = queryset.filter(ID_Camara_Votacao__exact=voto_id)

    return pos_processo(queryset, request)

def votacao_proposicao(request):
    queryset = Votacao_Proposicao.objects.all()

    proposicao_id = request.GET.get('proposicaoID', None)
    voto_id = request.GET.get('votoID', None)
    if proposicao_id:
        queryset = queryset.filter(ID_Camara_Proposicao__exact=proposicao_id)
    if voto_id:
        queryset = queryset.filter(ID_Camara_Votacao__exact=voto_id)

    return pos_processo(queryset, request)

def autor_proposicao(request):
    queryset = Autor_Proposicao.objects.all()

    proposicao_id = request.GET.get('proposicaoID', None)
    politico_CPF = request.GET.get('politicoCPF', None)
    if proposicao_id:
        queryset = queryset.filter(ID_Camara_Proposicao__exact=proposicao_id)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    return pos_processo(queryset, request)

def integrante_orgao(request):
    queryset = Integrante_Orgao.objects.all()

    siglaOrgao = request.GET.get('orgaoSigla', None)
    politico_CPF = request.GET.get('politicoCPF', None)
    if siglaOrgao:
        queryset = queryset.filter(Sigla_Orgao__exact=siglaOrgao)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    return pos_processo(queryset, request)

def integrante_frente(request):
    queryset = Integrante_Frente.objects.all()

    frente_id = request.GET.get('frenteID', None)
    politico_CPF = request.GET.get('politicoCPF', None)
    if frente_id:
        queryset = queryset.filter(ID_Camara_Frente__exact=frente_id)
    if politico_CPF:
        queryset = queryset.filter(Politico_CPF__exact=politico_CPF)

    return pos_processo(queryset, request)