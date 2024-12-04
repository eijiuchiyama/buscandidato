import {Header, Footer} from './App.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Cartao = ({ id, proposicao_tipo, proposicao_numero, proposicao_ano }) =>(
    <div className="col-md-auto mb-2 mt-2">
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{`${id}`}</h5>
                <Link to={`/votacao/${id}/${proposicao_tipo}/${proposicao_numero}/${proposicao_ano}`} style={{color:"black", textDecoration: "none"}}>Ver mais</Link>
            </div>
        </div>
    </div>
);

function VotacoesProposicao(){
    const { proposicao_id, proposicao_tipo, proposicao_numero, proposicao_ano } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/votacao_proposicao/?proposicaoID=${proposicao_id}`) // URL da sua API
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
  }, [proposicao_id]);

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
            {proposicao_tipo && proposicao_numero && proposicao_ano ? (
            <div className="card-header text-center rounded" style={{backgroundColor: '#d8d8d8'}}>
                <h3>Camara dos Deputados</h3>
                <h1>{`Votações da proposição ${proposicao_tipo} ${proposicao_numero} / ${proposicao_ano}`}</h1>
            </div>
            ) : (<></>) }
            {data ? (
            <div className="container text-center">
                <div className="row justify-content-md-center mb-2 mt-2">
                    {data.map((item) => (
                    <Cartao key={item.pk} id={item.fields.ID_Camara_Votacao} proposicao_tipo={proposicao_tipo} proposicao_numero={proposicao_numero} proposicao_ano={proposicao_ano} />
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

export default VotacoesProposicao;