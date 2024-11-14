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

def new_mandato(entry):
    return models.mandato(
            Politico_CPF = politico,
            Legislatura = entry["idLegislatura"],
            Estado = entry["siglaUf"],
            Inicio_Mandato = get_date(entry["dataHora"]),
        )

def new_partido(entry):
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

class Integrante_Partido(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Sigla_Partido = models.ForeignKey(Partido, on_delete=models.CASCADE)
    Data_Inicio = models.DateField(blank=True, null=True)
    Data_Fim = models.DateField(blank=True, null=True)

def import_Profissao(politico, data):
    for entry in data:
        
        profissao.save()
        print("profession" + profissao.Titulo + " of " + politico.CPF + " included.")