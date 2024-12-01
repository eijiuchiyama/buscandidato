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

def votacao_proposicao_exists(relacao):
    return models.Votacao_Proposicao.objects.filter(ID_Camara_Proposicao = relacao.ID_Camara_Proposicao,
                                                    ID_Camara_Votacao = relacao.ID_Camara_Votacao).exists()

def import_Relacao(proposicao, votacao):
    relacao = models.Votacao_Proposicao(
        ID_Camara_Proposicao = proposicao,
        ID_Camara_Votacao = votacao,
    )
    
    if not votacao_proposicao_exists(relacao):
        relacao.save()
        print("Relation Proposicao " + proposicao.ID_Camara_Proposicao + " e Votacao " + votacao.ID_Camara_Votacao + " included.")
    else:
        print("Relation Proposicao " + proposicao.ID_Camara_Proposicao + " e Votacao " + votacao.ID_Camara_Votacao + " already included.")