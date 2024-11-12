import {Header} from './App.js'
import icone from './iconefoto.png';
import CamaraDeputadosPicture from './assets/CamaraDeputadosPicture.webp';
import Button from 'react-bootstrap/Button';
import Camara from './camara.json';
import React from 'react';

const Cartao = ({ nome, partido }) =>(
    <div className="col-md-auto">
        {/* cartao do candidato*/}
        <div className="card text-bg-light mb-3" style={{'max-width': '540px'}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={icone} className="img-fluid rounded-start" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title">{nome}</h4>
                        <h5 className="card-text">{partido}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

function MembrosCD(){
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
            Item    <h2>Câmara dos Deputados</h2>
                <h1>Lista de Membros</h1>
            </div>

            {/* container dinamico dos candidatos */}
            <div className="container text-center">
                <div className="row justify-content-md-center">
                    {Camara.map((item) => (
                    <Cartao key={item.id} nome={item.nome} partido={item.partido} />
                    ))}
                </div>
            </div>
            <div className="text-center d-grid gap-2">
              <Button>Lista de membros</Button>
              <Button>Frentes</Button>
            </div>
        </div>
      </body>
    </html>
  );
}

export default MembrosCD;
