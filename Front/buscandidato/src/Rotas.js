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
import MembrosCamara from './MembrosCamara';
import ListaPartidos from './ListaPartidos';
import ListaPoliticos from './ListaPoliticos';
import ListaFrentes from './ListaFrentes';
import ListaOrgaos from './ListaOrgaos';
import ListaProposicoes from './Proposicoes';
import ListaMembros from './ListaMembros';
import VotacoesProposicao from './VotacoesProposicao';
import ListaIntegrantesPartido from './ListaIntegrantesPartido';
import ListaIntegrantesFrente from './ListaIntegrantesFrente';
import ListaIntegrantesOrgao from './ListaIntegrantesOrgao';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/candidato/:candidato" component={Candidato} element={<Candidato />} />
        <Route path="/mandato/:candidato/:mandato" component={Mandato} element={<Mandato />} />
        <Route path="/partido/:partido" component={Partido} element={<Partido />} />
        <Route path="/lista-integrantes-partido/:partido" component={Partido} element={<ListaIntegrantesPartido />} />
        <Route path="/lista-integrantes-frente/:frente_nome/:frente_id" element={<ListaIntegrantesFrente />} />
        <Route path="/lista-integrantes-orgao/:orgao_nome/:orgao_sigla" element={<ListaIntegrantesOrgao />} />
        <Route path="/senado" element={<Senado />} />
        <Route path="/deputados" element={<Deputados />} />
        <Route path="/municipal" element={<Municipal />} />
        <Route path="/lista-frentes/:pagina" element={<ListaFrentes />} />
        <Route path="/lista-orgaos/:pagina" element={<ListaOrgaos />} />
        <Route path="/lista-proposicoes/:pagina" element={<ListaProposicoes />} />
        <Route path="/lista-membros/:pagina" element={<ListaMembros />} />
        <Route path="/membros-camara/:pagina" element={<MembrosCamara />} />
        <Route path="/frente/:frente" component={Frente} element={<Frente />} />
        <Route path="/orgao/:orgao" component={Orgao} element={<Orgao />} />
        <Route path="/proposicao/:proposicao" component={Proposicao} element={<Proposicao />} />
        <Route path="/votacao/:votacao/:proposicao_tipo/:proposicao_numero/:proposicao_ano" component={Votacao} element={<Votacao />} />
        <Route path="/resultados/:tipoPesquisa/:nome" element={<ResultadoPesquisa />} />
        <Route path="/atualizacoes" element={<Atualizacoes />} />
        <Route path="/sobre" element={<SobreSite />} />
        <Route path="/lista-partidos/:pagina" element={<ListaPartidos/>} />
        <Route path="/lista-politicos/:pagina" element={<ListaPoliticos/>} />
        <Route path="/votacoes-proposicao/:proposicao_id/:proposicao_tipo/:proposicao_numero/:proposicao_ano" component={Proposicao} element={<VotacoesProposicao />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
