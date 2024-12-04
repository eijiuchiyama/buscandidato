import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

function Partido(){
  const { partido } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/partidos/?sigla=${partido}`) // URL da sua API
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
  }, [partido]);

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
        {data ? (
        <div class="card p-3">
            <div class="card-header text-center rounded">
                <h1>{data[0].fields.Nome.toUpperCase()}</h1>
            </div>
            <div class="card-body">
                <h3>Sigla do partido: {data[0].pk}</h3>
                <h3>Número de deputados federais: {data[0].fields.Qty_Membros_Camara}</h3>
                <h3>Número de deputados senadores: -</h3>
                <h3>Número de vereadores na Câmara Municipal de São Paulo: -</h3>
                <h3>Situação: {data[0].fields.Situacao}</h3> 
            </div>
            <Link to={`/lista-integrantes-partido/${data[0].pk}`}><Button>Lista de integrantes</Button></Link>
        </div>
        ) : (<></>) }
        <Footer/>
      </body>
    </html>
  );
}

export default Partido;
