import {Header, Footer} from './App.js'
import CamaraDeputadosPicture from './assets/CamaraDeputadosPicture.webp';
import Button from 'react-bootstrap/Button';
import proposicoes from './Proposicoes.json';
import React from 'react';

const Cartao = ({ numero, autor, ementa }) =>(
    <div className="col-md-auto">
        {/* cartao do candidato*/}
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{numero}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Autor: {autor}</h6>
                    <p class="card-text">Ementa: {ementa}</p>
                <a href="#" className="card-link">Ver mais</a>
            </div>
        </div>
    </div>
);

function Proposicoes(){
    return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body className="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div className="card p-3">
            <div className="card-header text-center rounded" style={{backgroundColor: '#ff5555'}}>
                <h2>Câmara dos Deputados</h2>
                <h1>Lista de Frentes Parlamentares</h1>
            </div>

            {/* container dinamico dos candidatos */}
            <div className="container text-center">
                <div className="row justify-content-md-center">
                    {proposicoes.map((item) => (
                    <Cartao key={item.id} numero={item.numero} autor={item.autor} ementa={item.ementa} />
                    ))}
                </div>
            </div>
            <div className="text-center d-grid gap-2">
              <Button>Lista de membros</Button>
              <Button>Frentes</Button>
            </div>
        </div>
        <Footer/>
      </body>
    </html>
  );
}

export default Proposicoes;
