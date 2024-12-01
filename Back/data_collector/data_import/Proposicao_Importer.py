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
    return models.Proposicao.objects.filter(ID_Camara_Proposicao = value).exists()

def get_Orgao_by_Sigla(value):
    if models.Orgao.objects.filter(Sigla_Orgao = value).exists():
        return models.Orgao.objects.filter(Sigla_Orgao = value)[0]
    else:
        return None

def get_Proposicao_by_ID(value):
    if ID_exists(value):
        return models.Proposicao.objects.filter(ID_Camara_Proposicao = value)[0]
    else:
        return None

def import_Proposicao(data):
    if ID_exists(data["id"]):
        print("Proposicao " + str(data["id"]) + " already included.")
        return

    proposicao = models.Proposicao(
        ID_Camara_Proposicao = data["id"],
        Sigla_Orgao = get_Orgao_by_Sigla(data["statusProposicao"]["siglaOrgao"]),
        Numero = data["numero"],
        Ementa = data["ementa"],
        Ano_Apresentacao = data["ano"],
        Data_Apresentacao = get_date(data["dataApresentacao"]),
        Situacao = data["statusProposicao"]["descricaoSituacao"],
        Data_Situacao = get_date(data["statusProposicao"]["dataHora"]),
        Keywords = data["keywords"],
        Tipo = data["siglaTipo"],
    )
    proposicao.save()
    print("Proposicao " + str(proposicao.ID_Camara_Proposicao) + " included.")