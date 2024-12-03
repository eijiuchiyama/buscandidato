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
    Nome = models.CharField(max_length=255, blank=True, null=True)
    Nome_Civil = models.CharField(max_length=255, blank=True, null=True)
    Partido_Atual = models.CharField(max_length=31, blank=True, null=True)
    Estado = models.CharField(max_length=15, blank=True, null=True)
    Estado_Nascimento = models.CharField(max_length=15, blank=True, null=True)
    Municipio_Nascimento = models.CharField(max_length=15, blank=True, null=True)
    Data_Nascimento = models.DateField(blank=True, null=True)
    Sexo = models.CharField(max_length=15, choices=SEXOS, blank=True, null=True)
    Escolaridade = models.CharField(max_length=255, blank=True, null=True)
    Telefone = models.CharField(validators=[telefone_regex], max_length=9, blank=True, null=True)
    Email = models.EmailField(blank=True, null=True)
    ID_Camara_Politico = models.IntegerField(blank=True, null=True)
    Foto = models.URLField(max_length=255, blank=True, null=True)

class Partido(models.Model):
    Sigla_Partido = models.CharField(max_length=31, primary_key=True)
    Nome = models.CharField(max_length=255, blank=True, null=True)
    Lider_Partido_CPF = models.ForeignKey(Politico, blank=True, null=True, on_delete=models.CASCADE)
    Qty_Membros_Camara = models.IntegerField(blank=True, null=True)
    ID_Camara_Partido = models.IntegerField(blank=True, null=True)
    Situacao = models.CharField(max_length=255, blank=True, null=True)
    Logo = models.URLField(max_length=255, blank=True, null=True)

class Orgao(models.Model):
    Sigla_Orgao = models.CharField(max_length=31, primary_key=True)
    Nome = models.CharField(max_length=255, blank=True, null=True)
    Sala = models.CharField(max_length=255, blank=True, null=True)
    ID_Camara_Orgao = models.IntegerField(blank=True, null=True)
    Data_Inicio = models.DateField(blank=True, null=True)
    Data_Fim = models.DateField(blank=True, null=True)
    Website = models.URLField(blank=True, null=True)
    Tipo = models.CharField(max_length=255, blank=True, null=True)

class Votacao(models.Model):
    ID_Camara_Votacao = models.CharField(max_length=255, primary_key=True)
    Sigla_Orgao = models.ForeignKey(Orgao, blank=True, null=True, on_delete=models.CASCADE)
    Resultado = models.CharField(max_length=255, blank=True, null=True)
    Data = models.DateField(blank=True, null=True)

class Frente(models.Model):
    ID_Camara_Frente = models.IntegerField(primary_key=True)
    Nome = models.CharField(max_length=255, blank=True, null=True)
    CPF_Coordenador = models.ForeignKey(Politico, blank=True, null=True, on_delete=models.CASCADE)
    PDF_Frente = models.FileField(blank=True, null=True)
    Legislatura = models.CharField(max_length=255, blank=True, null=True)

class Proposicao(models.Model):
    ID_Camara_Proposicao = models.IntegerField(primary_key=True)
    Sigla_Orgao = models.ForeignKey(Orgao, blank=True, null=True, on_delete=models.CASCADE)
    Numero = models.CharField(max_length=255, blank=True, null=True)
    Ementa = models.CharField(max_length=255, blank=True, null=True)
    Ano_Apresentacao = models.CharField(max_length=255, blank=True, null=True)
    Data_Apresentacao = models.DateField(blank=True, null=True)
    Situacao = models.CharField(max_length=255, blank=True, null=True)
    Data_Situacao = models.DateField(blank=True, null=True)
    Keywords = models.CharField(max_length=255, blank=True, null=True)
    Tipo = models.CharField(max_length=255, blank=True, null=True)

# ========================================= Relacoes =========================================
class Profissao(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Titulo = models.CharField(max_length=255, blank=True, null=True)
    Data = models.DateField(blank=True, null=True)

class Despesa(models.Model):
    CPF_Politico = models.ForeignKey(Politico, blank=True, null=True, on_delete=models.CASCADE)
    Tipo_Despesa = models.CharField(max_length=255, blank=True, null=True)
    Codigo_Documento = models.CharField(max_length=255, blank=True, null=True)
    Numero_Documento = models.CharField(max_length=255, blank=True, null=True)
    PDF_Documento = models.URLField(max_length=255, blank=True, null=True)
    Valor_Atual = models.CharField(max_length=255, blank=True, null=True)
    Fornecedor = models.CharField(max_length=255, blank=True, null=True)
    Data = models.DateField(blank=True, null=True)
    CNPJ_Fornecedor = models.CharField(max_length=255, blank=True, null=True)

class Mandato(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Legislatura = models.CharField(max_length=255, blank=True, null=True)
    Inicio_Mandato = models.DateField(blank=True, null=True)
    Fim_Mandato = models.DateField(blank=True, null=True)
    Estado = models.CharField(max_length=15, blank=True, null=True)

class Integrante_Partido(models.Model):
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Sigla_Partido = models.ForeignKey(Partido, on_delete=models.CASCADE)
    Data_Inicio = models.DateField(blank=True, null=True)
    Data_Fim = models.DateField(blank=True, null=True)

class Voto_Politico(models.Model):
    ID_Camara_Votacao = models.ForeignKey(Votacao, on_delete=models.CASCADE)
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Voto = models.CharField(max_length=255, blank=True, null=True)

class Votacao_Proposicao(models.Model):
    ID_Camara_Proposicao = models.ForeignKey(Proposicao, on_delete=models.CASCADE)
    ID_Camara_Votacao = models.ForeignKey(Votacao, on_delete=models.CASCADE)

class Autor_Proposicao(models.Model):
    ID_Camara_Proposicao = models.ForeignKey(Proposicao, on_delete=models.CASCADE)
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Tipo = models.CharField(max_length=255, blank=True, null=True)
    Nome = models.CharField(max_length=255, blank=True, null=True)

class Integrante_Orgao(models.Model):
    Sigla_Orgao = models.ForeignKey(Orgao, on_delete=models.CASCADE)
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
    Cargo = models.CharField(max_length=255, blank=True, null=True)
    Legislatura = models.CharField(max_length=255, blank=True, null=True)
    Periodo_Inicio = models.DateField(blank=True, null=True)
    Periodo_Fim = models.DateField(blank=True, null=True)

class Integrante_Frente(models.Model):
    ID_Camara_Frente = models.ForeignKey(Frente, on_delete=models.CASCADE)
    Politico_CPF = models.ForeignKey(Politico, on_delete=models.CASCADE)
