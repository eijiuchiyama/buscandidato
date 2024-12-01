import os
import sys
import json
import time
import django
import requests

import data_import.Votacao_Importer as VotacaoImporter
import data_import.Votacao_Proposicao_Importer as RelacaoImporter

# Access the directory two above the script
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Initialize the Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buscandidato.settings")
django.setup()

# Access the Database
import buscandidatoapp.models as models

# Function to check if a text is in json format
def is_json(text):
    try:
        json.loads(text)
        return True
    except ValueError:
        return False

# Function to get response in json format of a url
def get_json(url):
    while(True):
        response = requests.get(url)
        if response.status_code == 404:
            return False
        elif response.status_code == 200 and is_json(response.text):
            json_data = response.json()
            return json_data
        else:
            print("Temporary Error in " + url)
            time.sleep(0.5)

# Make requests to API
URL_RELACAO = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/<id>/votacoes?ordem=DESC&ordenarPor=dataHoraRegistro"
URL_VOTACAO = "https://dadosabertos.camara.leg.br/api/v2/votacoes/<id>"
start = 0

for number, proposicao in enumerate(models.Proposicao.objects.all()[start:]):
    id = proposicao.ID_Camara_Proposicao

    print(number + start)

    link_relacao_data = URL_RELACAO.replace("<id>", str(id))
    Relacao_data = get_json(link_relacao_data)
    if Relacao_data:
        for entry in Relacao_data:
            votacao_id = entry["id"]

            link_votacao_data = URL_VOTACAO.replace("<id>", str(id))
            Votacao_data = get_json(link_votacao_data)
            if Votacao_data:
                VotacaoImporter.import_Votacao(Votacao_data)

                votacao = VotacaoImporter.get_Votacao_by_ID(votacao_id)
                RelacaoImporter.import_Relacao(proposicao, votacao)