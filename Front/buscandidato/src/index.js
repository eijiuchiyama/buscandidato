import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Instituicao from './Instituicao';
import Partido from './Partido';
import Candidato from './Candidato';
import ResultadoPesquisa from './ResultadoPesquisa';
import Mandato from './Mandato';
import TodosPartidos from './TodosPartidos';
import TodosPoliticos from './TodosPoliticos';
import SobreSite from './SobreSite';
import Frente from './Frente';
import Proposicao from './Proposicao';
import Orgao from './Orgao';
import Votacao from './Votacao';
import VotacoesProposicao from './VotacoesProposicao';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VotacoesProposicao />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
