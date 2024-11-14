import requests

import data_import.Deputado_Importer as DeputadoImporter
import data_import.Partido_Importer as PartidoImporter
import data_import.Deputado_History_Importer as Deputado_History_Importer

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
        if response.status_code == 200 and is_json(response.text):
            json_data = response.json()
            return json_data
        else:
            print("Temporary Error in " + url)
            time.sleep(0.5)

# Make requests to API
URL_HISTORY = "https://dadosabertos.camara.leg.br/api/v2/deputados/<id>/historico"
url = "https://dadosabertos.camara.leg.br/api/v2/deputados?dataInicio=2000-01-01&dataFim=2024-11-13&ordem=ASC&ordenarPor=nome"

while url!= None:
    page = get_json(url)
    datas = page["dados"]

    for entry in datas:
        id = entry["id"]

        Politico = DeputadoImporter.get_Deputado_by_ID(id)
        link_history_data = URL_HISTORY.replace("<id>", str(id))
        History_data = get_json(link_history_data)["dados"]
        Deputado_History_Importer.import_History(Politico, History_data)

    url = nextPage(page["links"])