from django.urls import path
from . import views

urlpatterns = [
    path('api/politicos/', views.politico, name='politicos'),
    path('api/partidos/', views.partido, name='partidos'),
    path('api/orgaos/', views.orgao, name='orgaos'),
    path('api/votacoes/', views.votacao, name='votacoes'),
    path('api/frentes/', views.frente, name='frentes'),
    path('api/proposicoes/', views.proposicao, name='proposicoes'),
    path('api/despesas/', views.despesa, name='despesas'),
    path('api/profissoes/', views.profissao, name='profissoes'),
    path('api/mandatos/', views.mandato, name='mandatos'),
    path('api/integrante_partido/', views.integrante_partido, name='integrante_partido'),
    path('api/voto_politico/', views.voto_politico, name='voto_politico'),
    path('api/votacao_proposicao/', views.votacao_proposicao, name='votacao_proposicao'),
    path('api/autor_proposicao/', views.autor_proposicao, name='autor_proposicao'),
    path('api/integrante_orgao/', views.integrante_orgao, name='integrante_orgao'),
    path('api/integrante_frente/', views.integrante_frente, name='integrante_frente'),
]