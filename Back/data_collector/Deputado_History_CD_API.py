import os
import sys
import json
import time
import django
import requests

import data_import.Deputado_History_Importer as Deputado_History_Importer

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
URL_HISTORY = "https://dadosabertos.camara.leg.br/api/v2/deputados/<id>/historico"

for number, politico in enumerate(models.Politico.objects.all()[0:]):
    id = politico.ID_Camara_Politico

    print(number + 0)

    link_history_data = URL_HISTORY.replace("<id>", str(id))
    History_data = get_json(link_history_data)
    if History_data:
        Deputado_History_Importer.import_History(politico, History_data["dados"])
