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
    return models.Votacao.objects.filter(ID_Camara_Votacao = value).exists()

def get_Orgao_by_Sigla(value):
    if models.Orgao.objects.filter(Sigla_Orgao = value).exists():
        return models.Orgao.objects.filter(Sigla_Orgao = value)[0]
    else:
        return None

def get_Votacao_by_ID(value):
    if ID_exists(value):
        return models.Votacao.objects.filter(ID_Camara_Votacao = value)[0]
    else:
        return None

def import_Votacao(data):
    if ID_exists(data["id"]):
        print("Votacao " + str(data["id"]) + " already included.")
        return

    votacao = models.Votacao(
        ID_Camara_Votacao = data["id"],
        Sigla_Orgao = get_Orgao_by_Sigla(data["siglaOrgao"]),
        Resultado = data["aprovacao"],
        Data = get_date(data["data"]),
    )
    votacao.save()
    print("Votacao " + str(votacao.ID_Camara_Votacao) + " included.")