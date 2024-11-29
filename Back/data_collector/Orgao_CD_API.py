import json
import time
import requests

import data_import.Orgao_Importer as OrgaoImporter
import data_import.Integrante_Orgao_Importer as MembroImporter

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
URL_DATA = "https://dadosabertos.camara.leg.br/api/v2/orgaos/<id>"
URL_MEMBER = "https://dadosabertos.camara.leg.br/api/v2/orgaos/<id>/membros?dataInicio=2000-01-01&dataFim=2024-11-18"
url = "https://dadosabertos.camara.leg.br/api/v2/orgaos?dataInicio=2000-01-01&dataFim=2024-11-18&itens=100&ordem=ASC&ordenarPor=id"

def include_member(Orgao, link):
    while link != None:
        page = get_json(link)
        datas = page["dados"]

        for member_entry in datas:
            MembroImporter.import_Member(Orgao, member_entry)

        link = nextPage(page["links"])

while url!= None:
    page = get_json(url)
    datas = page["dados"]

    for entry in datas:
        id = entry["id"]
        if id == "111" or id == "180":
            continue

        link_orgao_data = URL_DATA.replace("<id>", str(id))
        Orgao_data = get_json(link_orgao_data)["dados"]
        OrgaoImporter.import_Orgao(link_orgao_data)
        
        Orgao = OrgaoImporter.get_Orgao_by_ID(id)
        link_member_data = URL_MEMBER.replace("<id>", str(id))
        include_member(Orgao, link_member_data)

    url = nextPage(page["links"])
