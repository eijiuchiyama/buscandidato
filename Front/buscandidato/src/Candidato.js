import {Header, Footer} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DropdownMenu from './components/DropdownMenu.js';
import { Link } from "react-router-dom";

function Mandatos(){

  const { candidato } = useParams();

  const [data_mand, setData_mand] = useState([]);
  const [loading_mand, setLoading_mand] = useState(true);
  const [error_mand, setError_mand] = useState(null);
  const [items_drop, setItems_drop] = useState([]);

  useEffect(() => {
    setLoading_mand(true);
    fetch(`/api/mandatos/?politicoCPF=${candidato}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData_mand(json);
        setLoading_mand(false);
      })
      .catch((err) => {
        setError_mand(err.message);
        setLoading_mand(false);
      });
  }, [candidato]);

  useEffect(() => {
    if (data_mand.length > 0 && candidato) {
      const dropdownItems = data_mand.map((item, index) => (
        <Link key={index} to={`/mandato/${candidato}/${item.pk}`} style={{ color: "#000000", textDecoration: "none", display: "block", width: "100%" }}>
          {`${item.fields.Inicio_Mandato} - ${item.fields.Fim_Mandato}`}
        </Link>
      ));

      setItems_drop(dropdownItems);
    }
  }, [data_mand, candidato]);

  return(
    <>
     {items_drop.length > 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ width: "300px" }}>
          <DropdownMenu optionsList = {items_drop}>
            <span>Mandatos</span>
          </DropdownMenu>
        </div>
      ):(<></>)}
    </>
  );
}

function Candidato(){
  
  const { candidato } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [data_prof, setData_prof] = useState([]);
  const [loading_prof, setLoading_prof] = useState(true);
  const [error_prof, setError_prof] = useState(null);

  useEffect(() => {
    fetch(`/api/politicos/?cpf=${candidato}`) // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [candidato]);

  useEffect(() => {
    fetch(`/api/profissoes/?politicoCPF=${candidato}`) // URL da sua API
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
  }, [candidato]);

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
        {data && data_prof ? (
        <div class="card p-3">
            <div class="card-header text-center rounded">
                <h2>{data[0].fields.Nome.toUpperCase()}</h2>
            </div>
            <div class="p-4">
              <img src={data[0].fields.Foto} class="mx-auto d-block rounded" style={{width:'30vw', maxWidth:"300px"}}/>
            </div>
            <div class="card-body">
              <h3>Nome civil: {data[0].fields.Nome_Civil}</h3>
              <h3>Partido atual: {data[0].fields.Partido_Atual}</h3>
              <h3>Estado: {data[0].fields.Estado}</h3>
              <h3>Estado de nascimento: {data[0].fields.Estado_Nascimento}</h3>
              <h3>Município de nascimento: {data[0].fields.Municipio_Nascimento}</h3>
              <h3>Data de nascimento: {data[0].fields.Data_Nascimento}</h3>
              <h3>Sexo: {data[0].fields.Sexo}</h3>
              <h3>Escolaridade: {data[0].fields.Escolaridade}</h3>
              <h3>Profissão: {data_prof[0].fields.Titulo}</h3>
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