import {Header, Footer} from './App.js'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cartao = ({ tipo, numero, ano, ementa, pk }) =>(
    <div className="col-md-auto mb-2 mt-2">
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{`${tipo} ${numero} / ${ano}`}</h5>
                    <p class="card-text">Ementa: {ementa}</p>
                <Link to={`/proposicao/${pk}`} style={{color:"black", textDecoration: "none"}}>Ver mais</Link>
            </div>
        </div>
    </div>
);

function Proposicoes(){

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/proposicoes/') // URL da sua API
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
      <body className="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div className="card p-3">
            <div className="card-header text-center rounded" style={{backgroundColor: '#5555ff'}}>
                <h2>Câmara dos Deputados</h2>
                <h1>Lista de Proposições</h1>
            </div>
            {data ? (
            <div className="container text-center">
                <div className="row justify-content-md-center mb-2 mt-2">
                    {data.map((item) => (
                    <Cartao key={item.pk} tipo={item.fields.Tipo} numero={item.fields.Numero} ano={item.fields.Ano_Apresentacao} ementa={item.fields.Ementa} pk={item.pk} />
                    ))}
                </div>
            </div>
            ) : (<></>) }
        </div>
        <Footer/>
      </body>
    </html>
  );
}

export default Proposicoes;
