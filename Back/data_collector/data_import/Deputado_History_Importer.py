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

# Function to get Partido by searching for Sigla
def get_Partido_by_SIGLA(value):
    if value == None:
        return None
    return models.Partido.objects.filter(Sigla_Partido = value)[0]

def new_mandato(politico, entry):
    return models.Mandato(
            Politico_CPF = politico,
            Legislatura = entry["idLegislatura"],
            Estado = entry["siglaUf"],
            Inicio_Mandato = get_date(entry["dataHora"]),
        )

def mandato_exists(mandato):
    return models.Mandato.objects.filter(Politico_CPF = mandato.Politico_CPF,
                                         Legislatura = mandato.Legislatura,
                                         Inicio_Mandato = mandato.Inicio_Mandato,
                                         Fim_Mandato = mandato.Fim_Mandato,
                                         Estado = mandato.Estado).exists()

def new_partido(politico, entry):
    print(entry["siglaPartido"])
    return models.Integrante_Partido(
            Politico_CPF = politico,
            Sigla_Partido = get_Partido_by_SIGLA(entry["siglaPartido"]),
            Data_Inicio = get_date(entry["dataHora"]),
        )

def integrante_partido_exists(integrante):
    return models.Integrante_Partido.objects.filter(Politico_CPF = integrante.Politico_CPF,
                                                    Sigla_Partido = integrante.Sigla_Partido,
                                                    Data_Inicio = integrante.Data_Inicio,
                                                    Data_Fim = integrante.Data_Fim).exists()

def import_History(politico, data):
    mandato = models.Mandato()
    integrante = new_partido(politico, data[0])
    last_Sigla_Partido = data[0]["siglaPartido"]

    for entry in data:
        if last_Sigla_Partido == None:
            last_Sigla_Partido = entry["siglaPartido"]
            integrante = new_partido(politico, entry)
        elif entry["siglaPartido"] != last_Sigla_Partido or entry == data[-1]:
            last_Sigla_Partido = entry["siglaPartido"]
            integrante.Data_Fim = get_date(entry["dataHora"])
            if not integrante_partido_exists(integrante):
                integrante.save()
                print("Partido " + integrante.Sigla_Partido.Sigla_Partido + " of " + politico.Nome_Civil + "(" + politico.CPF + ") included.")
            else:
                print("Partido " + integrante.Sigla_Partido.Sigla_Partido + " of " + politico.Nome_Civil + "(" + politico.CPF + ") already included.")
            integrante = new_partido(politico, entry)
        
        if "Posse de Eleito Titular" in entry["descricaoStatus"]:
            mandato = new_mandato(politico, entry)
        if "Afastamento definitivo" in entry["descricaoStatus"] and mandato.Legislatura == entry["idLegislatura"]:
            mandato.Fim_Mandato = get_date(entry["dataHora"])
            if not mandato_exists(mandato):
                mandato.save()
                print("Mandato " + str(mandato.Legislatura) + " of " + politico.Nome_Civil + "(" + politico.CPF + ") included.")
            else:
                print("Mandato " + str(mandato.Legislatura) + " of " + politico.Nome_Civil + "(" + politico.CPF + ") already included.")