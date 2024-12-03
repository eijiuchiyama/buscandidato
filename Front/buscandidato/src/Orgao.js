import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

function Orgao(){

  const { orgao } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/orgaos') // URL da sua API
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
    if (data.length > 0 && orgao) {
      
      const found = data.find((item) => {return item.fields.Nome.toLowerCase() === orgao.toLowerCase(); });
      setResult(found);
    }
  }, [data, orgao]);



  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const getSala = () => {
    if (result.fields.Sala == null) {
        return "-";
    }
    return result.fields.Sala;
  };

  const getDataFim = () => {
    if (result.fields.Data_Fim == null) {
        return "-";
    }
    return result.fields.Data_Fim;
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
      {result ? (
      <div class="container rounded p-4" style={{backgroundColor: '#ffffff'}}>
          <div class="text-center mb-5">
              <h3>Câmara dos Deputados</h3>
              <h1>{result.fields.Nome.toUpperCase()}</h1>
          </div>
          <div>
              <h3>Sigla: {result.pk}</h3>
              <h3>Sala: {getSala()}</h3>
              <h3>Data de início: {result.fields.Data_Inicio}</h3>
              <h3>Data de fim: {getDataFim()}</h3>
          </div>
          <Link to={`/lista-integrantes-orgao/${result.pk}`}><Button>Lista de integrantes</Button></Link>
      </div>
      ) : (<></>)}
      <Footer/>
    </body>
  </html>
  );
}

export default Orgao;