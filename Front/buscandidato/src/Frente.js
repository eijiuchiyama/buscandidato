import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

function Frente(){

  const { frente } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/frentes/?id=${frente}`) // URL da sua API
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
  }, [frente]);

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
              <h1>{data[0].fields.Nome.toUpperCase()}</h1>
          </div>
          <div class="m-5 border" style={{ height: '500px', borderWidth: '5px' }}>
            <Worker workerUrl={"/pdf.worker.js"}>
                <Viewer fileUrl={data[0].fields.PDF_Frente} />
            </Worker>
        </div>
        <Link to={`/lista-integrantes-frente/${data[0].fields.Nome}/${data[0].pk}`}><Button>Lista de integrantes</Button></Link>
      </div>
      ) : (<></>)}
      <Footer/>
    </body>
  </html>
  );
}

export default Frente;