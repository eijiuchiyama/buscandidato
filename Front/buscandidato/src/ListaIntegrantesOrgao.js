import {Header, Footer} from './App.js'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Cartao = ({ cpf }) =>(
  <div className="col-md-auto mb-2 mt-2">
      <div className="card" style={{width: '18rem'}}>
          <div className="card-body">
              <h5 className="card-title">{`${cpf}`}</h5>
              <Link to={`/candidato/${cpf}`} style={{color:"black", textDecoration: "none"}}>Ver mais</Link>
          </div>
      </div>
  </div>
);

function ListaIntegrantesOrgao(){

    const { orgao_nome, orgao_sigla } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [result, setResult] = useState([]);

  useEffect(() => {
    fetch('/api/integrante_orgao/') // URL da sua API
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
    if (data.length > 0 && orgao_sigla) {
      const found = data.filter((item) => { return item.fields.Sigla_Orgao === orgao_sigla; });
      setResult(found);
      console.log(result);
    }
  }, [data, orgao_sigla]);

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
                <h2>{orgao_nome.toUpperCase()}</h2>
                <h1>Lista de integrantes do Órgão</h1>
            </div>
            {result ? (
            <div className="container text-center">
                <div className="row justify-content-md-center mb-2 mt-2">
                    {result.map((item) => (
                    <Cartao key={item.pk} cpf={item.fields.Politico_CPF} />
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

export default ListaIntegrantesOrgao;