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
    if not models.Partido.objects.filter(Sigla_Partido = entry["sigla"]).exists():
        partido = models.Partido(
            Sigla_Partido = entry["sigla"],
            Nome = entry["nome"],
        )
        if entry["detalhes"] != None:
            partido.Numero_Eleitoral = entry["detalhes"]["numeroEleitoral"]
            if entry["detalhes"]["status"] != None:
                partido.Qty_Membros_Camara = entry["detalhes"]["status"]["totalMembros"]
                if entry["detalhes"]["status"]["lider"] != None and entry["detalhes"]["status"]["lider"]["uri"] != "":
                    politico_data = requests.get(entry["detalhes"]["status"]["lider"]["uri"]).json()["dados"]
                    
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
                    partido.Lider_Partido_CPF = politico
        partido.save()
        print(partido.Sigla_Partido + " information updated.")

print("Data successfully loaded into the database.")

