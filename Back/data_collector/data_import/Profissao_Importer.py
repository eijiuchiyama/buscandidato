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

def profession_exists(politico, titulo):
    return models.Profissao.objects.filter(Politico_CPF = politico, Titulo = titulo).exists()

def import_Profissao(politico, data):
    if profession_exists(politico, data["titulo"]):
        print("profession " + str(data["titulo"]) + " of " + politico.Nome_Civil + "(" + politico.CPF + ") already included.")
        return
    
    profissao = models.Profissao(
        Politico_CPF = politico,
        Titulo = data["titulo"],
        Data = get_date(data["dataHora"]),
    )
    profissao.save()
    print("profession " + str(profissao.Titulo) + " of " + politico.Nome_Civil + "(" + politico.CPF + ") included.")