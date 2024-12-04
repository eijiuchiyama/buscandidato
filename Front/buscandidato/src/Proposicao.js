import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Proposicao(){

  const { proposicao } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/proposicoes/?id=${proposicao}`) // URL da sua API
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
  }, [proposicao]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

    return (
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        {data ? (
        <div class="container rounded p-4" style={{backgroundColor: '#ffffff'}}>
            <div class="text-center mb-5">
                <h3>Câmara dos Deputados</h3>
                <h1>{`${data[0].fields.Tipo} ${data[0].fields.Numero}/${data[0].fields.Ano_Apresentacao}`}</h1>
            </div>
            <div>
                <h3>Data de Apresentacao: {data[0].fields.Data_Apresentacao}</h3>
                <h3>Ementa: {data[0].fields.Ementa}</h3>
                <h3>Temas: {data[0].fields.Keywords}</h3>
                <h3>Situação: {data[0].fields.Situacao}</h3>
            </div>
        </div>
        ) : (<></>) }
        <Footer/>
      </body>
    </html>
    );
}

export default Proposicao;