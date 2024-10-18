import requests

'''
data_inicio e data_fim no formato AAAA-MM-DD
'''
def request_partidos(sigla=None, data_inicio=None, data_fim=None):
    url = "https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla"
    if sigla != None:
        url += f"&sigla={sigla}"
    if data_inicio != None:
        url += f"&dataInicio={data_inicio}"
    if data_fim != None:
        url += f"&dataFim={data_fim}"

    partidos = []
    while True:
        resposta = requests.get(url).json()
        partidos.extend(resposta['dados'])

        tem_proximo = False
        for link in resposta['links']:
            if link['rel'] == 'next':
                tem_proximo = True
                url = link['href']
                break
        if not tem_proximo:
            break

    return partidos

'''
sigla_sexo é M para masculino, ou F para feminino
data_inicio e data_fim no formato AAAA-MM-DD
'''
def request_deputados(nome=None, sigla_uf=None, sigla_partido=None, sigla_sexo=None, data_inicio=None, data_fim=None):
    url = "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome"
    if nome != None:
        url += f"&nome={nome}"
    if sigla_uf != None:
        url += f"&siglaUf={sigla_uf}"
    if sigla_partido != None:
        url += f"&siglaPartido={sigla_partido}"
    if sigla_sexo != None:
        url += f"&siglaSexo={sigla_sexo}"
    if data_inicio != None:
        url += f"&dataInicio={data_inicio}"
    if data_fim != None:
        url += f"&dataFim={data_fim}"

    deputados = []
    while True:
        resposta = requests.get(url).json()
        deputados.extend(resposta['dados'])

        tem_proximo = False
        for link in resposta['links']:
            if link['rel'] == 'next':
                tem_proximo = True
                url = link['href']
                break
        if not tem_proximo:
            break

    return deputados
