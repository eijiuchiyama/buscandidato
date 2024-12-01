import os
import sys
import json
import time
import django
import requests

import data_import.Despesa_Importer as DespesaImporter

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
URL_DESPESA = "https://dadosabertos.camara.leg.br/api/v2/deputados/<id>/despesas?idLegislatura=57,56,55,54,53,52,51&ordem=ASC&ordenarPor=ano"
start = 0

for number, politico in enumerate(models.Politico.objects.all()[start:]):
    id = politico.ID_Camara_Politico

    print(number + start)

    link_despesa_data = URL_DESPESA.replace("<id>", str(id))
    Despesa_data = get_json(link_despesa_data)
    if Despesa_data:
        for entry in Despesa_data:
            DespesaImporter.import_Despesa(politico, entry)
