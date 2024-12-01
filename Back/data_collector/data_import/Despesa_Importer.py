import os
import sys
import django

# Access the directory two above the script
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

# Initialize the Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buscandidato.settings")
django.setup()

# Access the Database
import buscandidatoapp.models as models

# Function to extract Date from date_time in formate XXXX-XX-XXTXX:XX
def get_date(date_time):
    Date = None
    if date_time != None:
        Date = date_time.split("T")[0]
    return Date

def despesa_exists(despesa):
    return models.Despesa.objects.filter(CPF_Politico = despesa.CPF_Politico,
                                        Tipo_Despesa = despesa.Tipo_Despesa,
                                        Codigo_Documento = despesa.Codigo_Documento,
                                        Numero_Documento = despesa.Numero_Documento,
                                        PDF_Documento = despesa.PDF_Documento,
                                        Valor_Atual = despesa.Valor_Atual,
                                        Fornecedor = despesa.Fornecedor,
                                        Data = despesa.Data,
                                        CNPJ_Fornecedor = despesa.CNPJ_Fornecedor).exists()

def import_Despesa(politico, data):    
    despesa = models.Despesa(
        CPF_Politico = politico,
        Tipo_Despesa = data["tipoDespesa"],
        Codigo_Documento = data["codDocumento"],
        Numero_Documento = data["numDocumento"],
        PDF_Documento = data["urlDocumento"],
        Valor_Atual = data["valorDocumento"],
        Fornecedor = data["nomeFornecedor"],
        Data = get_date(data["dataDocumento"]),
        CNPJ_Fornecedor = data["cnpjCpfFornecedor"],
    )

    if not despesa_exists(despesa):
        despesa.save()
        print("Despesa " + despesa.Data + " of Politico " + politico.Nome_Civil + "(" + politico.CPF + ")" + " included.")
    else:
        print("Despesa " + despesa.Data + " of Politico " + politico.Nome_Civil + "(" + politico.CPF + ")" + " already included.")
