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

# Function to get Partido by searching for Sigla
def get_Partido_by_SIGLA(value):
    return models.Partido.objects.filter(Sigla_Partido = value)[0]

def new_mandato(politico, entry):
    return models.mandato(
            Politico_CPF = politico,
            Legislatura = entry["idLegislatura"],
            Estado = entry["siglaUf"],
            Inicio_Mandato = get_date(entry["dataHora"]),
        )

def new_partido(politico, entry):
    return models.Integrante_Partido(
            Politico_CPF = politico,
            Sigla_Partido = get_Partido_by_SIGLA(entry["siglaPartido"]),
            Data_Inicio = get_date(entry["dataHora"]),
        )

class Mandato(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Legislatura = models.CharField(max_length=255, blank=True, null=True)
    Inicio_Mandato = models.DateField(blank=True, null=True)
    Fim_Mandato = models.DateField(blank=True, null=True)
    Estado = models.CharField(max_length=15, blank=True, null=True)

def import_Profissao(politico, data):
    mandato = new_mandato(politico, data[0])
    integrante = new_partido(politico, data[0])

    for entry in data[1:]:
        if entry["siglaPartido"] != integrante.Sigla_Partido.Sigla_Partido:
            integrante.Data_Fim = get_date(entry["dataHora"])
            integrante.save()
            integrante = new_partido(politico, entry)
            print("Partido" + integrante.Sigla_Partido.Sigla_Partido + " of " + politico.Nome_Civil + "(" + politico.CPF + ") included.")