from django.db import models
from django.core.validators import RegexValidator

class Politico(models.Model):
    SEXOS = {
        "M": "Masculino",
        "F": "Feminino",
    }
    cpf_regex = RegexValidator(regex=r'^\d{11}$', message="O CPF deve ser do seguinte formato: '12345678912'.")
    telefone_regex = RegexValidator(regex=r'^\d{4}-\d{4}$', message="O telefone deve ser do seguinte formato: '1234-5678'.")
    
    CPF = models.CharField(validators=[cpf_regex], max_length=11, primary_key=True)
    Nome = models.CharField(max_length=255)
    Partido_atual = models.CharField(max_length=31)
    Estado = models.CharField(max_length=15)
    Estado_nascimento = models.CharField(max_length=15)
    Municipio_nascimento = models.CharField(max_length=15)
    Data_nascimento = models.DateField()
    Sexo = models.CharField(max_length=15, choices=SEXOS)
    Escolaridade = models.CharField(max_length=255)
    Profissao = models.CharField(max_length=255)
    Telefone = models.CharField(validators=[telefone_regex], max_length=9, blank=True)
    Email = models.EmailField()
    ID_camara_politico = models.IntegerField()
    Foto = models.ImageField()
