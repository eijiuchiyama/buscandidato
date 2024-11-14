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
import VotacoesProposicao from './VotacoesProposicao';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/candidato" element={<Candidato />} />
        <Route path="/candidato/mandato" element={<Mandato />} />
        <Route path="/partido" element={<Partido />} />
        <Route path="/senado" element={<Senado />} />
        <Route path="/deputados" element={<Deputados />} />
        <Route path="/municipal" element={<Municipal />} />
        <Route path="/instituicao/frente" element={<Frente />} />
        <Route path="/instituicao/orgao" element={<Orgao />} />
        <Route path="/instituicao/proposicao" element={<Proposicao />} />
        <Route path="/instituicao/votacao" element={<Votacao />} />
        <Route path="/resultados" element={<ResultadoPesquisa />} />
        <Route path="/atualizacoes" element={<Atualizacoes />} />
        <Route path="/sobre" element={<SobreSite />} />
        <Route path="/instituicao/proposicao/resultados" element={<VotacoesProposicao />} />
      </Routes>
    </Router>
  );
}

export default Main;