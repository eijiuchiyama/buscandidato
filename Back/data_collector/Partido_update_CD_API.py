import os
import sys
import json
import time
import django
import requests

import data_import.Partido_Updater as PartidoUpdater

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
URL_PARTIDO = "https://dadosabertos.camara.leg.br/api/v2/partidos/<id>"
start = 93

for number, partido in enumerate(models.Partido.objects.all()[start:]):
    id = partido.ID_Camara_Partido

    print(number + start, id, partido.Sigla_Partido)

    link_partido_data = URL_PARTIDO.replace("<id>", str(id))
    Partido_data = get_json(link_partido_data)
    if Partido_data:
        PartidoUpdater.update_Partido(Partido_data["dados"])
