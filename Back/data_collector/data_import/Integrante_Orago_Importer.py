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

def get_Deputado_by_ID(value):
    if models.Politico.objects.filter(ID_Camara_Politico = value).exists():
        return models.Politico.objects.filter(ID_Camara_Politico = value)[0]
    else:
        return None

def integrante_orgao_exists(integrante):
    return models.Integrante_Frente.objects.filter(Sigla_Orgao = integrante.Sigla_Orgao,
                                                    Politico_CPF = integrante.Politico_CPF,
                                                    Cargo = integrante.Cargo,
                                                    Legislatura = integrante.Legislatura,
                                                    Periodo_Inicio = integrante.Periodo_Inicio,
                                                    Periodo_Fim = integrante.Periodo_Fim).exists()

def import_Member(Orgao, data):
    politico = get_Deputado_by_ID(data["id"])
    if politico == None:
        print("Politico not in scope of DataBase.")
        return

    integrante = models.Integrante_Orgao(
        Sigla_Orgao = Orgao,
        Politico_CPF = politico,
        Cargo = data["titulo"],
        Legislatura = data["idLegislatura"],
        Periodo_Inicio = get_date(data["dataInicio"]),
        Periodo_Fim = get_date(data["dataDim"])
    )
    
    if not integrante_orgao_exists(integrante):
        integrante.save()
        print("Politico " + politico.Nome_Civil + "(" + politico.CPF + " of " + Orgao.Sigla_Orgao + ") included.")
    else:
        print("Politico " + politico.Nome_Civil + "(" + politico.CPF + " of " + Orgao.Sigla_Orgao + ") already included.")