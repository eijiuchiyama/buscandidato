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

# Function to extract Date from date_time in formate XXXX-XX-XXTXX:XX
def get_date(date_time):
    Date = None
    if date_time != None:
        Date = date_time.split("T")[0]
    return Date

def ID_exists(value):
    return models.Orgao.objects.filter(ID_Camara_Orgao = value).exists()

def get_Orgao_by_ID(value):
    return models.Orgao.objects.filter(ID_Camara_Orgao = value)[0]

def get_Orgao_by_Sigla(value):
    return models.Orgao.objects.filter(Sigla_Orgao = value)[0]

def import_Orgao(data):
    if ID_exists(data["id"]):
        print(data["sigla"] + " already included.")
        return
    
    orgao = models.Orgao(
        Sigla_Orgao = data["sigla"],
        Nome = data["nome"],
        Sala = data["sala"],
        ID_Camara_Orgao = data["id"],
        Data_Inicio = get_date(data["dataInicio"]),
        Data_Fim = get_date(data["dataFim"]),
        Website = data["urlWebsite"],
        Tipo = data["tipoOrgao"],
    )
    orgao.save()
    print(orgao.Sigla_Orgao + " included.")