from django.test import TestCase, Client
from .models import *

# Create your tests here.
class RequestPoliticoTestCase(TestCase):
    def setUp(self):
        Politico.objects.create(CPF=11122233344, Nome="Pedro Julio")
        Politico.objects.create(CPF=22233344455, Nome="Marcelo Martins")
        Politico.objects.create(CPF=33344455566, Nome="Pedro Ricardo")
        Politico.objects.create(CPF=44455566677, Nome="Lucas Pedroso")
        Politico.objects.create(CPF=55566677788, Nome="Paula Loira")

    def test_nome(self):
        c = Client()
        response = c.get('/api/politicos?nome=pedro', follow=True).json()
        
        pks = ['11122233344', '33344455566', '44455566677']
        self.assertTrue(len(response) == 3)
        self.assertTrue(response[0]["pk"] in pks)
        self.assertTrue(response[1]["pk"] in pks)
        self.assertTrue(response[2]["pk"] in pks)
    
    def test_cpf(self):
        c = Client()
        response = c.get('/api/politicos?cpf=55566677788', follow=True).json()

        pks = ['55566677788']
        self.assertTrue(len(response) == 1)
        self.assertTrue(response[0]['pk'] in pks)

class RequestPartidoTestCase(TestCase):
    def setUp(self):
        p1 = Politico.objects.create(CPF=11122233344, Nome="Pedro Julio")
        p2 = Politico.objects.create(CPF=33344455566, Nome="Pedro Ricardo")
        p3 = Politico.objects.create(CPF=55566677788, Nome="Paula Loira")
        p4 = Politico.objects.create(CPF=44455566677, Nome="Lucas Pedroso")
        p5 = Politico.objects.create(CPF=22233344455, Nome="Marcelo Martins")
        Partido.objects.create(Sigla_Partido="ABC", Nome="Alfa beta cinza", Lider_Partido_CPF=p2)
        Partido.objects.create(Sigla_Partido="BCA", Nome="Brasil com alma", Lider_Partido_CPF=p3)
        Partido.objects.create(Sigla_Partido="EFG", Nome="Ele faz galma", Lider_Partido_CPF=p5)
    
    def test_sigla(self):
        c = Client()
        response = c.get('/api/partidos?sigla=a', follow=True).json()

        pks = ['ABC', 'BCA']
        self.assertTrue(len(response) == 2)
        self.assertTrue(response[0]["pk"] in pks)
        self.assertTrue(response[1]["pk"] in pks)
    
    def test_nome(self):
        c = Client()
        response = c.get('/api/partidos?nome=alma', follow=True).json()

        pks = ['BCA', 'EFG']
        self.assertTrue(len(response) == 2)
        self.assertTrue(response[0]["pk"] in pks)
        self.assertTrue(response[1]["pk"] in pks)
    
    def test_liderCPF(self):
        c = Client()
        response = c.get('/api/partidos?liderCPF=22233344455', follow=True).json()

        pks = ['EFG']
        self.assertTrue(len(response) == 1)
        self.assertTrue(response[0]["pk"] in pks)
    
    def test_siglaExata(self):
        c = Client()
        response = c.get('/api/partidos?siglaExata=ABC', follow=True).json()

        pks = ['ABC']
        self.assertTrue(len(response) == 1)
        self.assertTrue(response[0]["pk"] in pks)