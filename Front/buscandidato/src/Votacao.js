import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Votacao(){

  const { votacao, proposicao_tipo, proposicao_numero, proposicao_ano } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [data_voto, setData_voto] = useState([]);
  const [loading_voto, setLoading_voto] = useState(true);
  const [error_voto, setError_voto] = useState(null);

  useEffect(() => {
    fetch(`/api/votacoes/?id=${votacao}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [votacao]);

  useEffect(() => {
    fetch(`/api/voto_politico/?votoID=${votacao}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData_voto(json);
        setLoading_voto(false);
      })
      .catch((err) => {
        setError_voto(err.message);
        setLoading_voto(false);
      });
  }, [votacao]);

  if (loading || loading_voto) return <p>Carregando...</p>;
  if (error || error_voto) return <p>Erro: {error}</p>;

  const resultado = () => {
    console.log(data[0].fields.Resultado)
    if (data[0].fields.Resultado === "1") {
        return "Aprovada";
    }
    return "Rejeitada";
  };

    return (
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        {data && data_voto ? (
        <div class="container rounded p-4" style={{backgroundColor: '#ffffff'}}>
          <div class="text-center mb-5">
              <h3>Câmara dos Deputados</h3>
              <h1>{`Votação ${data[0].pk}`}</h1>
              <h3>{`Proposição afetada: ${proposicao_tipo} ${proposicao_numero} / ${proposicao_ano}`}</h3>
          </div>
          <div>
              <h3>{`Data: ${data[0].fields.Data}`}</h3>
              <h3>{`Órgão: ${data[0].fields.Sigla_Orgao}`}</h3>
              <h3>{`Resultado: ${resultado()}`}</h3>
          </div>
          <div className="container">
            {data_voto.map((item) => (
              <h1>{`${item.fields.Politico_CPF}:${item.fields.Voto}`}</h1>    
            ))}
          </div>
        </div>
        ) : (<></>) }
        <Footer/>
      </body>
    </html>
    );
}

export default Votacao;