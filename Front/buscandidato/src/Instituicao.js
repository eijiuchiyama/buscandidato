import './Instituicao.css';
import {Header} from './App.js'
import CamaraMunicipalPicture from './assets/CamaraMunicipalPicture.webp';
import CamaraDeputadosPicture from './assets/CamaraDeputadosPicture.webp';
import SenadoPicture from './assets/SenadoPicture.jpeg';
import Button from 'react-bootstrap/Button';

function Instituicao(){
    return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="card p-3">
            <div class="card-header text-center rounded" style={{backgroundColor: '#ff5555'}}>
                <h2>Senado</h2>
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
              <Button>Lista de membros</Button>
              <Button>Frentes</Button>
            </div>
        </div>
      </body>
    </html>
  );
}

export default Instituicao;
