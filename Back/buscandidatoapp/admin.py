from django.contrib import admin
from .models import Politico
from .models import Partido
from .models import Orgao
from .models import Votacao
from .models import Frente
from .models import Proposicao
from .models import Despesa
from .models import Mandato
from .models import Integrante_Partido
from .models import Votacao_Politico
from .models import Votacao_Proposicao
from .models import Autor_Proposicao
from .models import Integrante_Orgao
from .models import Integrante_Frente

admin.site.register(Politico)
admin.site.register(Partido)
admin.site.register(Orgao)
admin.site.register(Votacao)
admin.site.register(Frente)
admin.site.register(Proposicao)
admin.site.register(Despesa)
admin.site.register(Mandato)
admin.site.register(Integrante_Partido)
admin.site.register(Votacao_Politico)
admin.site.register(Votacao_Proposicao)
admin.site.register(Autor_Proposicao)
admin.site.register(Integrante_Orgao)
admin.site.register(Integrante_Frente)
