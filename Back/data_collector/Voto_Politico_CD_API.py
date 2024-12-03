import os
import sys
import json
import time
import django
import requests

import data_import.Voto_Politico_Importer as VotoImporter

# Access the directory two above the script
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Initialize the Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buscandidato.settings")
django.setup()

# Access the Database
import buscandidatoapp.models as models

# Function to get URL of next page of API
def nextPage(Links):
    for entry in Links:
        if entry["rel"] == "next":
            return entry["href"]
    
    return None

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
URL_VOTACAO = "https://dadosabertos.camara.leg.br/api/v2/votacoes/<id>/votos"
start = 0

for number, votacao in enumerate(models.Votacao.objects.all()[start:]):
    id = votacao.ID_Camara_Votacao

    print(number + start, id)

    link_votacao_data = URL_VOTACAO.replace("<id>", str(id))

    while link_votacao_data != None:
        page = get_json(link_votacao_data)
        if page:
            for entry in page["dados"]:
                VotoImporter.import_Voto(votacao, entry)
        
        link_votacao_data = nextPage(page["links"])