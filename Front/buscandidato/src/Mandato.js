import {Header, Footer} from './App.js';
import Tabs from './components/Tabs.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Mandato(){

    const { candidato, mandato } = useParams();

    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [data_mand, setData_mand] = useState([]);
  const [loading_mand, setLoading_mand] = useState(true);
  const [error_mand, setError_mand] = useState(null);
  const [result_mand, setResult_mand] = useState(null);

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
      
      const found = data.find((item) => { return item.pk === candidato });
      setResult(found);
    }
  }, [data, candidato]);

  useEffect(() => {
    fetch('/api/mandatos/') // URL da sua API
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
  }, []);

  useEffect(() => {
    // Buscar o item após os dados estarem carregados
    if (data_mand.length > 0 && mandato) {
      console.log(data_mand);
      const found = data_mand.find((item) => { return item.pk == mandato });
      setResult_mand(found);
    }
  }, [data_mand, mandato]);

  if (loading || loading_mand) return <p>Carregando...</p>;
  if (error || error_mand) return <p>Erro: {error}</p>;

    const tabData = [
        { label: 'Despesas', content: 'Aqui estão as despesas detalhadas.' },
        { label: 'Frentes', content: 'Aqui estão as frentes que ele participou.' },
        { label: 'Votações', content: 'Aqui estão as votações em que ele participou.' },
        { label: 'Proposições', content: 'Aqui estão as proposições que ele propôs.' },
    ];

    return(
        <html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
            <link href="components/tabs.css" rel="stylesheet"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </head>
        <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        {result && result_mand ? (
        <div className="tabs-container">
            <div className="App">
                <h1 className="geeks">{result.fields.Nome}</h1>
                <h2 className="geeks">{`Mandato ${result_mand.fields.Inicio_Mandato} - ${result_mand.fields.Fim_Mandato}`}</h2>
                <Tabs tabs={tabData} />
            </div>
        </div>
        ) : (<></>)}
        <Footer/>
        </body>
        </html>
    );
}

export default Mandato;
