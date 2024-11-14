import os
import sys
import django

# Access the directory two above the script
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

# Initialize the Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buscandidato.settings")
django.setup()

# Access the Database
import buscandidatoapp.models as models

def ID_exists(value):
    return models.Partido.objects.filter(ID_Camara_Partido = value).exists()

def get_Partido_by_ID(value):
    return models.Partido.objects.filter(ID_Camara_Partido = value)[0]

def get_Partido_by_SIGLA(value):
    return models.Partido.objects.filter(Sigla_Partido = value)[0]

# Function to get Deputado by searching for IS get from last space of uri
def get_Deputados(uri):
    politico = None
    if uri != None:
        id = uri.split("/")[-1]
        politico = models.Politico.objects.filter(ID_Camara_Politico = id)[0]
    return politico

def import_Partido(data):
    if ID_exists(data["id"]):
        print(data["sigla"] + " already included.")
        return    

    partido = models.Partido(
        Sigla_Partido = data["sigla"],
        Nome = data["Nome"],
        Lider_Partido_CPF = get_Deputados(data["status"]["lider"]["uri"]),
        Qty_Membros_Camara = data["status"]["totalPosse"],
        ID_Camara_Partido = data["id"],
        Situacao = data["status"]["situacao"],
    )
    partido.save()
    print(partido.Sigla_Partido + " included.")