import {Header, Footer} from './App.js'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Cartao = ({ nome, pk }) =>(
  <div className="col-md-auto mb-2 mt-2">
      <div className="card" style={{width: '18rem'}}>
          <div className="card-body">
              <h5 className="card-title">{`${nome.toUpperCase()}`}</h5>
              <Link to={`/candidato/${pk}`} style={{color:"black", textDecoration: "none"}}>Ver mais</Link>
          </div>
      </div>
  </div>
);

function ListaPoliticos(){

  const { pagina } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/politicos/?itens=100&pagina=${pagina}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        console.log(data[0]);
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
  }, [pagina]);

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
            <div className="card-header text-center rounded" style={{backgroundColor: '#d8d8d8'}}>
                <h1>Lista de todos os Políticos</h1>
            </div>
            {data && pagina ? (
            <div className="container text-center">
                <div className="row justify-content-md-center mb-2 mt-2">
                    {data.map((item) => (
                    <Cartao key={item.pk} nome={item.fields.Nome} pk={item.pk} />
                    ))}
                </div>
                <div>
                  <Link to={`/lista-politicos/${parseInt(pagina)-1}`}><Button>Anterior</Button></Link>
                  <span class="mx-3">{pagina}</span>
                  <Link to={`/lista-politicos/${parseInt(pagina)+1}`}><Button>Próxima</Button></Link>
                </div>
            </div>
            ) : (<></>) }
        </div>
        <Footer/>
      </body>
    </html>
  );
}

export default ListaPoliticos;
