import {Header} from './App.js'
import icone from './iconefoto.png';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Partido(){
  const { partido } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/partidos/') // URL da sua API
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
  }, []);

  useEffect(() => {
    // Buscar o item após os dados estarem carregados
    if (data.length > 0 && partido) {
      
      const found = data.find((item) => { return item.fields.Nome.toLowerCase() === partido.toLowerCase(); });
      setResult(found);
    }
  }, [data, partido]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        {result ? (
        <div class="card p-3">
            <div class="card-header text-center rounded">
                <h1>{result.fields.Nome}</h1>
            </div>
            <div class="p-4">
              <img src={icone} class="mx-auto d-block" style={{width:'30vw'}}/>
            </div>
            <div class="card-body">
                <h3>Sigla do partido:</h3>
                <h3>Ano de criação:</h3>
                <h3>Presidente do partido:</h3>
                <h3>Número de deputados federais: {result.fields.Qty_Membros_Camara}</h3>
                <h3>Número de deputados senadores:</h3>
                <h3>Número de vereadores na Câmara Municipal de São Paulo:</h3>
                <h3>Situação: {result.fields.Situacao}</h3> 
            </div>
        </div>
        ) : (<></>) }
      </body>
    </html>
  );
}

export default Partido;
