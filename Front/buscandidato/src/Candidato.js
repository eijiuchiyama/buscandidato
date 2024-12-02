import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DropdownMenu from './components/DropdownMenu.js';
import { Link, useNavigate } from "react-router-dom";

const MenuIcon = () => {
  return (<><i class="bi bi-justify" style={{ fontSize: 20 }}></i></>);
}

function Mandatos(){
  return(
    <>
      <div class="d-flex justify-content-center align-items-center" style={{width: "300px"}}>
        <DropdownMenu optionsList={[
        <div><Link to='/' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Mandato 1</Link></div>
        ]}> <h7>Mandatos</h7> </DropdownMenu>
      </div>
    </>
  )
}

function Candidato(){
  
  const { candidato } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [data_prof, setData_prof] = useState([]);
  const [loading_prof, setLoading_prof] = useState(true);
  const [error_prof, setError_prof] = useState(null);
  const [result_prof, setResult_prof] = useState(null);

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
    fetch('/api/profissoes/') // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData_prof(json);
        setLoading_prof(false);
      })
      .catch((err) => {
        setError_prof(err.message);
        setLoading_prof(false);
      });
  }, []);

  useEffect(() => {
    // Buscar o item após os dados estarem carregados
    if (data.length > 0 && candidato) {
      
      const found = data.find((item) => {return item.pk === candidato; });
      setResult(found);
    }
  }, [data, candidato]);

  useEffect(() => {
    // Buscar o item após os dados estarem carregados
    if (data_prof.length > 0 && candidato) {
      
      const found = data_prof.find((item) => {return item.fields.Politico_CPF === candidato; });
      setResult_prof(found);
    }
  }, [data_prof, candidato]);

  if (loading || loading_prof) return <p>Carregando...</p>;
  if (error || error_prof) return <p>Erro: {error}</p>;

  return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        {result && result_prof ? (
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
              <h3>Profissão: {result_prof.fields.Titulo}</h3>
            </div>
            <Mandatos />
        </div> 
      ) : (<></>)}
      <Footer/>
      </body>
    </html>
  );
}

export default Candidato;