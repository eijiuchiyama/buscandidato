import requests

import data_import.Deputados_Importer as DeputadoImporter

# Function to get URL of next page of API
def nextPage(Links):
    for entry in Links:
        if entry["rel"] == "next":
            return entry["href"]
    
    return None

# Make requests to API
URL_DATA = "https://dadosabertos.camara.leg.br/api/v2/deputados/<id>"
URL_PROFESSION = "https://dadosabertos.camara.leg.br/api/v2/deputados/<id>/profissoes"
URL_HISTORY = "https://dadosabertos.camara.leg.br/api/v2/deputados/<id>/historico"
url = "https://dadosabertos.camara.leg.br/api/v2/deputados?dataInicio=2000-01-01&dataFim=2024-11-13&ordem=ASC&ordenarPor=nome"

while url!= None:
    page = requests.get(url).json()
    datas = page["dados"]

    for entry in datas:
        id = entry["id"]
        if not DeputadoImporter.ID_exists(id):
            link_data = URL_DATA.replace("<id>", str(id))
            Deputado_data = requests.get(link_data).json()["dados"]
            DeputadoImporter.import_Deputado(Deputado_data)

    url = nextPage(page["links"])