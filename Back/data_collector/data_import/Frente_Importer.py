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
    return models.Frente.objects.filter(ID_Camara_Frente = value).exists()

def get_Frente_by_ID(value):
    if models.Frente.objects.filter(ID_Camara_Frente = value).exists():
        return models.Frente.objects.filter(ID_Camara_Frente = value)[0]
    else:
        return None

def get_Deputado_by_ID(value):
    if models.Politico.objects.filter(ID_Camara_Politico = value).exists():
        return models.Politico.objects.filter(ID_Camara_Politico = value)[0]
    else:
        return None

def import_Frente(data):
    if ID_exists(data["id"]):
        print(data["titulo"] + " already included.")
        return
    if data["coordenador"]["id"] == None or data["coordenador"]["id"] == "":
        print(data["titulo"] + " doesn't exists.")
        return

    frente = models.Frente(
        ID_Camara_Frente = data["id"],
        Nome = data["titulo"],
        CPF_Coordenador = get_Deputado_by_ID(data["coordenador"]["id"]),
        PDF_Frente = data["urlDocumento"],
        Legislatura = data["idLegislatura"],
    )
    frente.save()
    print(frente.Nome + " included.")