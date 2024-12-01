import {Header, Footer} from './App.js'
import ListEntry from './components/ListEntry.js'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ListaVotacoes(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/votacoes/') // URL da sua API
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
            <div class="card p-3">
                <div class="card-header text-center rounded mb-5">
                    <h3>Câmara dos Deputados</h3>
                    <h1>Lista de todas as Votações</h1>
                </div>
                {data ? (
                <div class="card-body text-center">
                  {data.map((item) => (
                    <Link to={`/votacao/${item.fields.Nome}`} style={{color:"black", textDecoration: "none"}}><ListEntry text={item.fields.Nome.toUpperCase()}/></Link>
                  ))}
                </div>
                ) : (<></>)}
            </div>
            <Footer />
          </body>
        </html>
    );
}

export default ListaVotacoes;