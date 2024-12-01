import {Header, Footer} from './App.js';
import ListEntry from './components/ListEntry.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function VotacoesProposicao(){
    const { proposicao } = useParams();

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

    return (
    <html>
    <head>
        <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    </head>
    <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
    <Header />
        <div class="container rounded p-4" style={{backgroundColor: '#ffffff'}}>
            <div class="text-center mb-5">
                <h3>Câmara dos Deputados</h3>
                <h1>Votações da Proposição 1</h1>
            </div>
            <div class="row">
                <div class="d-flex flex-column gap-3 mb-3 col-sm-6">
                    <div class="container rounded p-4 text-center" style={{backgroundColor: '#d8d8d8'}}>
                        <h1>Votação 1</h1>
                        <h3>06/11/2024</h3>
                    </div>
                    <div class="container rounded p-4 text-center" style={{backgroundColor: '#d8d8d8'}}>
                        <h1>Votação 3</h1>
                        <h3>06/11/2024</h3>
                    </div>
                    <div class="container rounded p-4 text-center" style={{backgroundColor: '#d8d8d8'}}>
                        <h1>Votação 5</h1>
                        <h3>06/11/2024</h3>
                    </div>
                </div>
                <div class="d-flex flex-column gap-3 mb-3 col-sm-6">
                    <div class="container rounded p-4 text-center" style={{backgroundColor: '#d8d8d8'}}>
                        <h1>Votação 2</h1>
                        <h3>06/11/2024</h3>
                    </div>
                    <div class="container rounded p-4 text-center" style={{backgroundColor: '#d8d8d8'}}>
                        <h1>Votação 4</h1>
                        <h3>06/11/2024</h3>
                    </div>
                </div>
            </div>
        </div>
    <Footer/>
    </body>
            </html>
    );
}

export default VotacoesProposicao;