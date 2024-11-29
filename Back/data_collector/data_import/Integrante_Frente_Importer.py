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

def get_Deputado_by_ID(value):
    if models.Politico.objects.filter(ID_Camara_Politico = value).exists():
        return models.Politico.objects.filter(ID_Camara_Politico = value)[0]
    else:
        return None

def integrante_frente_exists(integrante):
    return models.Integrante_Frente.objects.filter(ID_Camara_Frente = integrante.ID_Camara_Frente,
                                                    Politico_CPF = integrante.Politico_CPF).exists()

def import_Member(Frente, data):
    politico = get_Deputado_by_ID(data["id"])
    if politico == None:
        print("Politico not in scope of DataBase.")
        return

    integrante = models.Integrante_Frente(
        ID_Camara_Frente = Frente,
        Politico_CPF = politico,
    )
    
    if not integrante_frente_exists(integrante):
        integrante.save()
        print("Politico " + politico.Nome_Civil + "(" + politico.CPF + " of " + Frente.Nome + ") included.")
    else:
        print("Politico " + politico.Nome_Civil + "(" + politico.CPF + " of " + Frente.Nome + ") already included.")