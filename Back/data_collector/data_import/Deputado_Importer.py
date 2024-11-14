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

def ID_exists(value):
    return models.Politico.objects.filter(ID_Camara_Politico = value).exists()

def get_Deputado_by_ID(value):
    return models.Politico.objects.filter(ID_Camara_Politico = value)[0]

def get_Deputado_by_CPF(value):
    return models.Politico.objects.filter(CPF = value)[0]

def import_Deputado(data):
    if ID_exists(data["id"]):
        print(data["nomeCivil"] + "(" + data["cpf"] + ") already included.")
        return

    politico = models.Politico(
        CPF = data["cpf"],
        Nome = data["ultimoStatus"]["nome"],
        Nome_Civil = data["nomeCivil"],
        Partido_Atual = data["ultimoStatus"]["siglaPartido"],
        Estado = data["ultimoStatus"]["siglaUf"],
        Estado_Nascimento = data["ufNascimento"],
        Municipio_Nascimento = data["municipioNascimento"],
        Data_Nascimento = data["dataNascimento"],
        Sexo = data["sexo"],
        Escolaridade = data["escolaridade"],
        Telefone = data["ultimoStatus"]["gabinete"]["telefone"],
        Email = data["ultimoStatus"]["gabinete"]["email"],
        ID_Camara_Politico = data["id"],
        Foto = data["ultimoStatus"]["urlFoto"],
    )
    politico.save()
    print(politico.Nome_Civil + "(" + politico.CPF + ") included.")