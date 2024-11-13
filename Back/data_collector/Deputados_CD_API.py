import requests

import data_import.Deputados_Importer as importer

# Function to get URL of next page of API
def nextPage(Links):
    for entry in Links:
        if entry["rel"] == "next":
            return entry["href"]
    
    return None

# Make requests to API
URL = "https://dadosabertos.camara.leg.br/api/v2/deputados?dataInicio=2000-01-01&dataFim=2024-11-13&ordem=ASC&ordenarPor=nome"

while URL!= None:
    JSON = requests.get(URL).json()
    DATAS = JSON["dados"]

    for entry in DATAS:
        ID = entry["id"]
        if not importer.ID_exists(ID):
            Deputado_data = entry["uri"].json()["dados"]
            importer.import_Deputado(Deputado_data)

    URL = nextPage(JSON["links"])