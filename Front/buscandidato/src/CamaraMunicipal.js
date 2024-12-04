import {Header, Footer} from './App.js'
import CamaraMunicipalPicture from './assets/CamaraMunicipalPicture.webp';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

function CamaraMunicipal(){
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return(
    <>
    {isDesktop &&
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="card p-3">
            <div class="card-header text-center rounded" style={{backgroundColor: '#55ff55'}}>
                <h1>Câmara Municipal de São Paulo</h1>
            </div>
            <div class="p-4">
              <img src={CamaraMunicipalPicture} class="mx-auto d-block rounded" style={{width:'40vw'}}/>
            </div>
            <div class="card-body">
                <h3>Cidade: São Paulo-SP</h3>
                <h3>Endereço: Viaduto Jacareí, 100</h3>
                <h3>CEP: 01319-900</h3>
                <h3>Telefone: 11 3396-4000</h3>
                <h3>Número de membros: 55</h3>
            </div>
            <div class="text-center d-grid gap-2">
              <Link to='/membros-camara/1'><Button style={{width:"50%"}}>Lista de membros</Button></Link>
              <Link to='/lista-frentes/1'><Button style={{width:"50%"}}>Frentes</Button></Link>
              <Link to='/lista-orgaos/1'><Button style={{width:"50%"}}>Órgãos</Button></Link>
              <Link to='/lista-proposicoes/1'><Button style={{width:"50%"}}>Proposições</Button></Link>
            </div>
        </div>
        <Footer/>
      </body>
    </html>}
    {isMobile &&
      <html>
        <head>
        <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </head>
        <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
          <Header />
          <div class="card p-3">
              <div class="card-header text-center rounded" style={{backgroundColor: '#55ff55'}}>
                  <h1>Câmara Municipal de São Paulo</h1>
              </div>
              <div class="p-4">
                <img src={CamaraMunicipalPicture} class="mx-auto d-block rounded" style={{width:'80%'}}/>
              </div>
              <div class="card-body">
                <h3>Cidade: São Paulo-SP</h3>
                <h3>Endereço: Viaduto Jacareí, 100</h3>
                <h3>CEP: 01319-900</h3>
                <h3>Telefone: 11 3396-4000</h3>
                <h3>Número de membros: 55</h3>
              </div>
              <div class="text-center d-grid gap-2">
                <Link to='/membros-camara/1'><Button style={{width:"80%"}}>Lista de membros</Button></Link>
                <Link to='/lista-frentes/1'><Button style={{width:"80%"}}>Frentes</Button></Link>
                <Link to='/lista-orgaos/1'><Button style={{width:"80%"}}>Órgãos</Button></Link>
                <Link to='/lista-proposicoes/1'><Button style={{width:"80%"}}>Proposições</Button></Link>
              </div>
          </div>
          <Footer/>
        </body>
      </html>}
    </>
  );
}

export default CamaraMunicipal;
