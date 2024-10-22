import requests

def adicionar_restricao(url, restricao_url, restricao_valor):
    if restricao_valor == None:
        return url
    return url + f"&{restricao_url}={restricao_valor}"

'''
sigla: Sigla de um partido
data_inicio: Data de início de um intervalo de tempo, no formato AAAA-MM-DD.
data_fim: Data de término de um intervalo de tempo, no formato AAAA-MM-DD.

Se não forem passados parâmetros, o serviço retorna os partidos que têm deputados em exercício no momento da requisição.
'''
def request_partidos(sigla=None, data_inicio=None, data_fim=None):
    url = "https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla"
    url = adicionar_restricao(url, "sigla", sigla)
    url = adicionar_restricao(url, "dataInicio", data_inicio)
    url = adicionar_restricao(url, "dataFim", data_fim)

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
nome: Parte nome parlamentar
sigla_uf: Uma sigla de unidade federativa (estados e Distrito Federal). Se ausente, serão retornados deputados de todos os estados.
sigla_partido: Uma sigla de partido ao qual seja filiado os deputados.
sigla_sexo: Letra que designe o gênero dos parlamentares que se deseja buscar, sendo M para masculino e F para feminino.
data_inicio: Data de início de um intervalo de tempo, no formato AAAA-MM-DD.
data_fim: Data de término de um intervalo de tempo, no formato AAAA-MM-DD.

Se não for passado um parâmetro de tempo, a lista enumerará somente os deputados em exercício no momento da requisição.
'''
def request_deputados(nome=None, sigla_uf=None, sigla_partido=None, sigla_sexo=None, data_inicio=None, data_fim=None):
    url = "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome"
    url = adicionar_restricao(url, "nome", nome)
    url = adicionar_restricao(url, "siglaUf", sigla_uf)
    url = adicionar_restricao(url, "siglaPartido", sigla_partido)
    url = adicionar_restricao(url, "siglaSexo", sigla_sexo)
    url = adicionar_restricao(url, "dataInicio", data_inicio)
    url = adicionar_restricao(url, "dataFim", data_fim)

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

'''
ano: ano da matéria
ano_norma: ano da norma jurídica gerada
data_fim_apresentacao: data de fim para pesquisa da data de apresentação da matéria, no formato AAAAMMDD
data_inicio_apresentacao: data de início para pesquisa da data de apresentação da matéria, no formato AAAAMMDD
nome_autor: nome do autor da matéria
sigla: sigla da matéria
tramitando: indica se retorna apenas as matérias que estão tramitando ("S") ou não ("N")

Se ano, ano_norma, data_fim_apresentacao e data_fim_apresentacao for None, então será considerado o ano atual
Pesquisa por período de apresentação tem limite de 1 ano
'''
def request_materias(ano=None, ano_norma=None, data_fim_apresentacao=None, data_inicio_apresentacao=None, 
                     nome_autor=None, sigla=None, tramitando=None):
    url = "https://legis.senado.leg.br/dadosabertos/materia/pesquisa/lista?"
    url = adicionar_restricao(url, "ano", ano)
    url = adicionar_restricao(url, "anoNormal", ano_norma)
    url = adicionar_restricao(url, "dataFimApresentacao", data_fim_apresentacao)
    url = adicionar_restricao(url, "dataInicioApresentacao", data_inicio_apresentacao)
    url = adicionar_restricao(url, "nomeAutor", nome_autor)
    url = adicionar_restricao(url, "sigla", sigla)
    url = adicionar_restricao(url, "tramitando", tramitando)

    resposta = requests.get(url, headers={"accept": "application/json"}).json()
    return resposta["PesquisaBasicaMateria"]["Materias"]["Materia"]
