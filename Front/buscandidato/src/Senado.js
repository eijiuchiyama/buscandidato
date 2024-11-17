import {Header} from './App.js'
import SenadoPicture from './assets/SenadoPicture.jpeg';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

function Senado(){
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
            <div class="card-header text-center rounded" style={{backgroundColor: '#ff5555'}}>
                <h1>Senado</h1>
            </div>
            <div class="p-4">
              <img src={SenadoPicture} class="mx-auto d-block rounded" style={{width:'40vw'}}/>
            </div>
            <div class="card-body">
                <h3>Cidade:</h3>
                <h3>Endereço:</h3>
                <h3>Número de membros:</h3>
            </div>
            <div class="text-center d-grid gap-2">
              <Link to='/instituicao/membros'><Button style={{width:"50%"}}>Lista de membros</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"50%"}}>Frentes</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"50%"}}>Órgãos</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"50%"}}>Proposições</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"50%"}}>Votações</Button></Link>
            </div>
        </div>
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
            <div class="card-header text-center rounded" style={{backgroundColor: '#ff5555'}}>
                <h1>Senado</h1>
            </div>
            <div class="p-4">
              <img src={SenadoPicture} class="mx-auto d-block rounded" style={{width:'80%'}}/>
            </div>
            <div class="card-body">
                <h3>Cidade:</h3>
                <h3>Endereço:</h3>
                <h3>Número de membros:</h3>
            </div>
            <div class="text-center d-grid gap-2">
              <Link to='/instituicao/membros'><Button style={{width:"80%"}}>Lista de membros</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"80%"}}>Frentes</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"80%"}}>Órgãos</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"80%"}}>Proposições</Button></Link>
              <Link to='/instituicao/frentes'><Button style={{width:"80%"}}>Votações</Button></Link>
            </div>
        </div>
      </body>
    </html>}
    </>
  );
}

export default Senado;
