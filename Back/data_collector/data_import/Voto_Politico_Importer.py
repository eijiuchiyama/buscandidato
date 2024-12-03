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

def voto_politico_exists(voto):
    return models.Voto_Politico.objects.filter(ID_Camara_Votacao = voto.ID_Camara_Votacao,
                                                Politico_CPF = voto.Politico_CPF,
                                                Voto = voto.Voto).exists()

def get_Deputado_by_ID(value):
    if models.Politico.objects.filter(ID_Camara_Politico = value).exists():
        return models.Politico.objects.filter(ID_Camara_Politico = value)[0]
    else:
        return None
    
def import_Voto(votacao, data):
    voto = models.Voto_Politico(
        ID_Camara_Votacao = votacao,
        Politico_CPF = get_Deputado_by_ID(data["deputado_"]["id"]),
        Voto = data["tipoVoto"],
    )
    
    if not voto_politico_exists(voto):
        voto.save()
        print("Vote of " + str(voto.Politico_CPF.CPF) + " in " + votacao.ID_Camara_Votacao + " included.")
    else:
        print("Vote of " + str(voto.Politico_CPF.CPF) + " in " + votacao.ID_Camara_Votacao + " already included.")