from django.contrib import admin
from . import models

admin.site.register(models.Politico)
admin.site.register(models.Partido)
admin.site.register(models.Orgao)
admin.site.register(models.Votacao)
admin.site.register(models.Frente)
admin.site.register(models.Proposicao)
admin.site.register(models.Despesa)
admin.site.register(models.Mandato)
admin.site.register(models.Integrante_Partido)
admin.site.register(models.Voto_Politico)
admin.site.register(models.Votacao_Proposicao)
admin.site.register(models.Autor_Proposicao)
admin.site.register(models.Integrante_Orgao)
admin.site.register(models.Integrante_Frente)
