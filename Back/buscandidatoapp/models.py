from django.db import models
from django.core.validators import RegexValidator

# ========================================= Entidades =========================================
class Politico(models.Model):
    SEXOS = {
        "M": "Masculino",
        "F": "Feminino",
    }
    cpf_regex = RegexValidator(regex=r'^\d{11}$', message="O CPF deve ser do seguinte formato: '12345678912'.")
    telefone_regex = RegexValidator(regex=r'^\d{4}-\d{4}$', message="O telefone deve ser do seguinte formato: '1234-5678'.")
    
    CPF = models.CharField(validators=[cpf_regex], max_length=11, primary_key=True)
    Nome = models.CharField(max_length=255, blank=True)
    Partido_Atual = models.CharField(max_length=31, blank=True)
    Estado = models.CharField(max_length=15, blank=True)
    Estado_Nascimento = models.CharField(max_length=15, blank=True)
    Municipio_Nascimento = models.CharField(max_length=15, blank=True)
    Data_Nascimento = models.DateField(blank=True, null=True)
    Sexo = models.CharField(max_length=15, choices=SEXOS, blank=True)
    Escolaridade = models.CharField(max_length=255, blank=True)
    Profissao = models.CharField(max_length=255, blank=True)
    Telefone = models.CharField(validators=[telefone_regex], max_length=9, blank=True, null=True)
    Email = models.EmailField(blank=True, null=True)
    ID_Camara_Politico = models.IntegerField(blank=True, null=True)
    Foto = models.ImageField(blank=True, null=True)

class Partido(models.Model):
    Sigla_Partido = models.CharField(max_length=31, primary_key=True)
    Lider_Partido_CPF = models.ForeignKey(Politico, blank=True, null=True, on_delete=models.CASCADE)
    Nome = models.CharField(max_length=255)
    Numero_Eleitoral = models.IntegerField(blank=True, null=True)
    Qty_Membros_Camara = models.IntegerField(blank=True, null=True)
    ID_Camara_Partido = models.IntegerField(blank=True, null=True)

class Orgao(models.Model):
    Sigla_Orgao = models.CharField(max_length=31, primary_key=True)
    Nome = models.CharField(max_length=255)
    Sala = models.CharField(max_length=255)
    ID_Camara_Orgao = models.IntegerField()
    Data_Inicio = models.DateField()
    Data_Fim = models.DateField()
    Website = models.URLField()

class Votacao(models.Model):
    ID_Camara_Votacao = models.IntegerField(primary_key=True)
    Sigla_Orgao = models.ForeignKey(Orgao, on_delete=models.CASCADE)
    Qty_Votos = models.IntegerField()
    Resultado = models.CharField(max_length=255)
    Data = models.DateField()

class Frente(models.Model):
    ID_Camara_Frente = models.IntegerField(primary_key=True)
    CPF_Coordenador = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Nome = models.CharField(max_length=255)
    PDF_Frente = models.FileField()

class Proposicao(models.Model):
    ID_Camara_Proposicao = models.IntegerField(primary_key=True)
    Sigla_Orgao = models.ForeignKey(Orgao, on_delete=models.CASCADE)
    Numero = models.CharField(max_length=255)
    Ementa = models.FileField()
    Ano_Proposicao = models.CharField(max_length=255)
    Situacao = models.CharField(max_length=255)
    Data_Situacao = models.CharField(max_length=255)
    Keywords = models.CharField(max_length=255)
    Tipo = models.CharField(max_length=255)

class Despesa(models.Model):
    Codigo_Despesa = models.CharField(max_length=15, primary_key=True)
    CPF_Politico = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Tipo_Despesa = models.CharField(max_length=255)
    PDF_Documento = models.FileField()
    Valor_Atual = models.IntegerField()
    Fornecedor = models.CharField(max_length=255)
    Data = models.DateField()
    CNPJ_Fornecedor = models.CharField(max_length=255)

# ========================================= Relacoes =========================================
class Mandato(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Sigla_Partido = models.ForeignKey(Partido, on_delete=models.CASCADE)
    Periodo = models.CharField(max_length=255)

class Integrante_Partido(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Sigla_Partido = models.ForeignKey(Partido, on_delete=models.CASCADE)
    Periodo = models.CharField(max_length=255)

class Votacao_Politico(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    ID_Camara_Votacao = models.ForeignKey(Votacao, on_delete=models.CASCADE)
    Voto = models.CharField(max_length=255)

class Votacao_Proposicao(models.Model):
    ID_Camara_Proposicao = models.ForeignKey(Proposicao, on_delete=models.CASCADE)
    ID_Camara_Votacao = models.ForeignKey(Votacao, on_delete=models.CASCADE)

class Autor_Proposicao(models.Model):
    ID_Camara_Proposicao = models.ForeignKey(Proposicao, on_delete=models.CASCADE)
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)

class Integrante_Orgao(models.Model):
    Sigla_Orgao = models.ForeignKey(Orgao, on_delete=models.CASCADE)
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)

class Integrante_Frente(models.Model):
    ID_Camara_Frente = models.ForeignKey(Frente, on_delete=models.CASCADE)
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
