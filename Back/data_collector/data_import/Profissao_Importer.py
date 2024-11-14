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

def import_Profissao(politico, data):
    for entry in data:
        profissao = models.Profissao(
            Politico_CPF = politico,
            Titulo = entry["titulo"],
            Data = entry["dataHora"]
        )
        profissao.save()
        print("profession" + profissao.Titulo + " of " + politico.CPF + " included.")