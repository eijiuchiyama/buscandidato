import json
import time
import requests

import data_import.Proposicao_Importer as ProposicaoImporter

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
URL_DATA = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/<id>"
URL_SOURCE = "https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaTipo=<sigla>&dataApresentacaoInicio=2000-01-01&dataApresentacaoFim=2024-11-30&ordem=ASC&ordenarPor=id&itens=100"
siglas = ["MPV", "PDL", "PDS", "PDC", "PDN", "PL", "PLS", "PLC", "PLP", "PLN", "PRC", "PRN", "PRS", "PEC"]

for sigla in siglas:
    url = URL_SOURCE.replace("<sigla>", sigla)
    while url!= None:
        page = get_json(url)
        datas = page["dados"]

        for entry in datas:
            id = entry["id"]
            
            link_proposicao_data = URL_DATA.replace("<id>", str(id))
            Proposicao_data = get_json(link_proposicao_data)["dados"]
            ProposicaoImporter.import_Proposicao(Proposicao_data)

        url = nextPage(page["links"])
