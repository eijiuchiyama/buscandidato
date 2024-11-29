import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ListEntry from './components/ListEntry.js'
import { Link } from 'react-router-dom';

function Resultado(){

  const { tipoPesquisa, nome } = useParams();

  const [dataPoliticos, setDataPoliticos] = useState([]);
  const [dataPartidos, setDataPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(tipoPesquisa == "politicos"){
      fetch(`/api/politicos?nome=${nome}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setDataPoliticos(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    } else if(tipoPesquisa == "partidos"){
      fetch(`/api/partidos?nome=${nome}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setDataPartidos(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      fetch(`/api/partidos?sigla=${nome}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setDataPartidos(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    } else{
      fetch(`/api/politicos?nome=${nome}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setDataPoliticos(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      fetch(`/api/partidos?nome=${nome}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setDataPartidos(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      fetch(`/api/partidos?sigla=${nome}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setDataPartidos(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const renderTitle = () => {
    if (dataPartidos.length > 0 || dataPoliticos.length > 0) {
        return <h1>Foram encontrados resultados para a sua pesquisa</h1>;
    }
    return <h1>Não foram encontrados resultados para a sua pesquisa</h1>;
  };

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
              {renderTitle()}
          </div>
          {dataPartidos ? (
          <div class="card-body text-center">
            {dataPartidos.map((item) => (
              <Link to={`/partido/${item.fields.Nome}`} style={{color:"black", textDecoration: "none"}}>
                <ListEntry text={item.fields.Nome.toUpperCase()}/>
              </Link>
            ))}
          </div>
          ) : (<></>)}
          {dataPoliticos ? (
          <div class="card-body text-center">
            {dataPoliticos.map((item) => (
              <Link to={`/candidato/${item.fields.Nome}`} style={{color:"black", textDecoration: "none"}}>
                <ListEntry text={item.fields.Nome.toUpperCase()}/>
              </Link>
            ))}
          </div>
          ) : (<></>)}
      </div>
      <Footer/>
    </body>
  </html>
  );

}

export default Resultado;
