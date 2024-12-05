import {Header} from './App.js'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Tabs from './components/Tabs.js'; // Componente de abas (implemente se ainda não existir)


function Mandato() {
  const { mandato } = useParams(); // Número do mandato vindo da URL
  console.log(mandato);
  const [PoliticoCpf, setPoliticoCpf] = useState(null);
  const [politicoNome, setPoliticoNome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [despesas, setDespesas] = useState([]);
  const [proposicoes, setProposicoes] = useState([]);
  const [frentes, setFrentes] = useState([]);
  const [votacoes, setVotacoes] = useState([]);
  const [estado, setEstado] = useState([]);
  const [inicio, setInicio] = useState([]);
  const [fim, setFim] = useState([]);

  useEffect(() => {
    const url = window.location.pathname;
    const parts = url.split("/");
    const cpf = parts[2]; // Posição do primeiro parâmetro
    setPoliticoCpf(cpf);
    console.log(PoliticoCpf)
    // Busca o mandato e obtém o CPF do político
    fetch(`/api/mandatos?pk=${mandato}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Erro ao buscar mandato: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const mandatoEncontrado = data.find((item) => item.pk === parseInt(mandato, 10));
        if (mandatoEncontrado) {
          const estadoMandato = mandatoEncontrado.fields.Estado;
          setEstado(estadoMandato);
          const inicioMandato = mandatoEncontrado.fields.Inicio_Mandato;
          setInicio(inicioMandato);
          const fimMandato = mandatoEncontrado.fields.Fim_Mandato;
          setFim(fimMandato);

          fetch(`/api/politicos`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Erro ao buscar políticos: ${res.status}`);
            }
            return res.json();
          })
          .then((politicos) => {
    // Filtrar político pelo CPF-
            const politico = politicos.find((p) => p.pk === cpf);
            if (politico?.fields?.Nome) {
              setPoliticoNome(politico.fields.Nome); // Define o nome do político
            } else {
              throw new Error('Nenhum político encontrado com o CPF especificado.');
            }
          })
          .catch((err) => console.error('Erro ao buscar político:', err));



          // Chama as APIs relacionadas usando o CPF

          fetch(`/api/autor_proposicao?cpf=${cpf}`)
            .then((res) => res.json())
            .then(setProposicoes)
            .catch((err) => console.error('Erro ao buscar proposições:', err));

          fetch('/api/frentes')
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Erro ao buscar frentes: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            const frentesCoordenadas = data.filter(
              (frente) => frente.fields.CPF_Coordenador === PoliticoCpf
            );
            if (frentesCoordenadas.length > 0) {
              setFrentes(frentesCoordenadas);
              console.log('Frentes coordenadas pelo político:', frentesCoordenadas);
            } else {
              console.log('Nenhuma frente encontrada para o coordenador com o CPF:', PoliticoCpf);
            }
          })
          .catch((err) => console.error('Erro ao buscar frentes:', err));


          fetch(`/api/votacao_proposicao?cpf=${cpf}`)
            .then((res) => res.json())
            .then(setVotacoes)
            .catch((err) => console.error('Erro ao buscar votações:', err));
        } else {
          throw new Error('Nenhum mandato encontrado para o número fornecido.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [mandato]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const tabData = [
    { label: 'Despesas', content: 'Despesas do período' },
    { label: 'Proposições', content: "Proposições" },
    { label: 'Frentes', content: frentes.length > 0
        ? frentes.map((frente, index) => (
            <><p key={index}>Nome: {frente.fields.Nome}</p> <p key={index}> PDF: {frente.fields.PDF_Frente}</p></>
          ))
        : <p>Nenhuma frente encontrada.</p>
    },
    { label: 'Votações', content: 'Votações' },
  ];


  return (
        <html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
            <link href="components/tabs.css" rel="stylesheet"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </head>
        <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div className="tabs-container">
            <div className="App">
                <h1 className="geeks">{politicoNome}</h1>
                <h2 className="geeks">Deputado federal por {estado}</h2>
                <h2 className="geeks">{inicio} - {fim}</h2>
                <Tabs tabs={tabData} />
            </div>
        </div>
        </body>
        </html>
  );
}

export default Mandato;
