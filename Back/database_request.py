import requests
import django
import json
import os

def inicialize():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buscandidato.settings")
    django.setup()

def get_politicos(nome=None):
    inicialize()
    from buscandidatoapp.models import Politico
    from django.core import serializers

    queryset = Politico.objects.all()
    if nome != None:
        queryset = queryset.filter(Nome__icontains=nome)

    data = serializers.serialize("json", queryset)
    return data

def get_partidos():
    inicialize()
    from buscandidatoapp.models import Partido
    from django.core import serializers

    queryset = Partido.objects.all()
    data = serializers.serialize("json", queryset)
    return data

def get_integrante_partido():
    inicialize()
    from buscandidatoapp.models import Integrante_Partido
    from django.core import serializers

    queryset = Integrante_Partido.objects.all()
    data = serializers.serialize("json", queryset)
    return data
