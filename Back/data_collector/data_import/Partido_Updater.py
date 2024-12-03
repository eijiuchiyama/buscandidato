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
    if models.Partido.objects.filter(ID_Camara_Partido = value).exists():
        return models.Partido.objects.filter(ID_Camara_Partido = value)[0]
    else:
        return None

def update_Partido(data):
    if not ID_exists(data["id"]):
        print(data["sigla"] + " noy found.")
        return    

    partido = get_Partido_by_ID(data["id"])
    partido.Logo = data["urlLogo"]
    
    partido.save()
    print(partido.Sigla_Partido + " updated.")