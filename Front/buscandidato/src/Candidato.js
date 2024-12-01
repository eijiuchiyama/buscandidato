import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Candidato(){
  
  const { candidato } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/politicos/') // URL da sua API
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
    if (data.length > 0 && candidato) {
      
      const found = data.find((item) => {return item.fields.Nome.toLowerCase() === candidato.toLowerCase(); });
      setResult(found);
    }
  }, [data, candidato]);

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
        {result ? (
        <div class="card p-3">
            <div class="card-header text-center rounded">
                <h2>{result.fields.Nome.toUpperCase()}</h2>
            </div>
            <div class="p-4">
              <img src={result.fields.Foto} class="mx-auto d-block rounded" style={{width:'30vw', maxWidth:"300px"}}/>
            </div>
            <div class="card-body">
              <h3>Nome civil: {result.fields.Nome_Civil}</h3>
              <h3>Partido atual: {result.fields.Partido_Atual}</h3>
              <h3>Estado: {result.fields.Estado}</h3>
              <h3>Estado de nascimento: {result.fields.Estado_Nascimento}</h3>
              <h3>Município de nascimento: {result.fields.Municipio_Nascimento}</h3>
              <h3>Data de nascimento: {result.fields.Data_Nascimento}</h3>
              <h3>Sexo: {result.fields.Sexo}</h3>
              <h3>Escolaridade: {result.fields.Escolaridade}</h3>
            </div>
        </div> 
      ) : (<></>)}
      <Footer/>
      </body>
    </html>
  );
}

export default Candidato;