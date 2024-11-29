import json
import time
import requests

import data_import.Frente_Importer as FrenteImporter
import data_import.Integrante_Frente_Importer as MembroImporter

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
URL_DATA = "https://dadosabertos.camara.leg.br/api/v2/frentes/<id>"
URL_MEMBER = "https://dadosabertos.camara.leg.br/api/v2/frentes/<id>/membros"
url = "https://dadosabertos.camara.leg.br/api/v2/frentes?idLegislatura=57,56,55,54&itens=100"

while url!= None:
    page = get_json(url)
    datas = page["dados"]

    for entry in datas:
        id = entry["id"]
        
        link_frente_data = URL_DATA.replace("<id>", str(id))
        Frente_data = get_json(link_frente_data)["dados"]
        FrenteImporter.import_Frente(Frente_data)
        
        Frente = FrenteImporter.get_Frente_by_ID(id)
        if Frente == None:
            continue
        link_member_data = URL_MEMBER.replace("<id>", str(id))
        Member_data = get_json(link_member_data)
        if Member_data:
            for member_entry in Member_data["dados"]:
                MembroImporter.import_Member(Frente, member_entry)

    url = nextPage(page["links"])
