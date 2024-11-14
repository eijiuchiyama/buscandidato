import json
import time
import requests

import data_import.Partido_Importer as PartidoImporter

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
URL_DATA = "https://dadosabertos.camara.leg.br/api/v2/partidos/<id>"
url = "https://dadosabertos.camara.leg.br/api/v2/partidos?dataInicio=2000-01-01&dataFim=2024-11-13&ordem=ASC&ordenarPor=sigla"

while url!= None:
    page = get_json(url)
    datas = page["dados"]

    for entry in datas:
        id = entry["id"]

        link_partido_data = URL_DATA.replace("<id>", str(id))
        Partido_data = get_json(link_partido_data)
        if Partido_data:
            PartidoImporter.import_Partido(Partido_data["dados"])

    url = nextPage(page["links"])

print("Data successfully loaded into the database.")

