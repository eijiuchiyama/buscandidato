import requests
import django
import json
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buscandidato.settings")
django.setup()

import buscandidatoapp.models as models

with open("partidos.json", "r") as file:
    data = json.load(file)

for entry in data:
    if models.Partido.objects.filter(Sigla_Partido = entry["sigla"]).exists():
        if entry["membros"] != None:
            for members in entry["membros"]:
                politico_data = requests.get(members["uri"]).json()["dados"]

                if not models.Politico.objects.filter(CPF = politico_data["cpf"]).exists():
                    politico = models.Politico(
                        CPF = politico_data["cpf"],
                        Nome = politico_data["nomeCivil"],
                        Partido_Atual = politico_data["ultimoStatus"]["siglaPartido"],
                        Estado = politico_data["ultimoStatus"]["siglaUf"],
                        Estado_Nascimento = politico_data["ufNascimento"],
                        Municipio_Nascimento = politico_data["municipioNascimento"],
                        Data_Nascimento = politico_data["dataNascimento"],
                        Sexo = politico_data["sexo"],
                        Escolaridade = politico_data["escolaridade"],
                        Telefone = politico_data["ultimoStatus"]["gabinete"]["telefone"],
                        Email = politico_data["ultimoStatus"]["gabinete"]["email"],
                    )
                    politico.save()
                    print(politico.CPF + " information updated.")

                politico = models.Politico.objects.get(CPF = politico_data["cpf"])
                partido = models.Partido.objects.get(Sigla_Partido = entry["sigla"])
                if not models.Integrante_Partido.objects.filter(Politico_CPF = politico, Sigla_Partido = partido).exists():
                    integrante_partido = models.Integrante_Partido(
                        Politico_CPF = politico,
                        Sigla_Partido = partido,
                    )
                    integrante_partido.save()

                    print(politico.CPF + " included in " + partido.Sigla_Partido)
                else:
                    print("Relation " + politico.CPF + " in " + partido.Sigla_Partido + " already included.")
    else:
        raise IndexError(entry["sigla"] + " doesn't exists.")

print("Data successfully loaded into the database.")

