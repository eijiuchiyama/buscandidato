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
