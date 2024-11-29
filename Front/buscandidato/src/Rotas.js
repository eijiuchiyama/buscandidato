import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Candidato from "./Candidato";
import Partido from "./Partido";
import Municipal from "./CamaraMunicipal";
import Deputados from "./CamaraDeputados";
import Senado from "./Senado";
import Frente from './Frente';
import Orgao from './Orgao';
import Proposicao from './Proposicao';
import Votacao from './Votacao';
import Mandato from './Mandato';
import ResultadoPesquisa from './ResultadoPesquisa';
import Atualizacoes from './Atualizacoes';
import SobreSite from './SobreSite';
import ListaPartidos from './ListaPartidos';
import ListaPoliticos from './ListaPoliticos';
import VotacoesProposicao from './VotacoesProposicao';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/candidato/:candidato" component={Candidato} element={<Candidato />} />
        <Route path="/mandato" element={<Mandato />} />
        <Route path="/partido/:partido" component={Partido} element={<Partido />} />
        <Route path="/senado" element={<Senado />} />
        <Route path="/deputados" element={<Deputados />} />
        <Route path="/municipal" element={<Municipal />} />
        <Route path="/lista-frentes" element={<Frente />} />
        <Route path="/lista-orgaos" element={<Orgao />} />
        <Route path="/lista-proposicoes" element={<Proposicao />} />
        <Route path="/lista-votacoes" element={<Votacao />} />
        <Route path="/lista-membros" element={<Votacao />} />
        <Route path="/frente" element={<Frente />} />
        <Route path="/orgao" element={<Orgao />} />
        <Route path="/proposicao" element={<Proposicao />} />
        <Route path="/votacao" element={<Votacao />} />
        <Route path="/resultados/:tipoPesquisa/:nome" element={<ResultadoPesquisa />} />
        <Route path="/atualizacoes" element={<Atualizacoes />} />
        <Route path="/sobre" element={<SobreSite />} />
        <Route path="/lista-partidos" element={<ListaPartidos/>} />
        <Route path="/lista-politicos" element={<ListaPoliticos/>} />
        <Route path="/resultados-votacao" element={<VotacoesProposicao />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
