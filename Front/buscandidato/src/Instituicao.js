import './Instituicao.css';
import './App.js'
import icone from './iconefoto.png';

function Instituicao(){
    return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body>
        <Header />
        <div class="card">
            <div class="card-header text-center">
                <h2>Senado</h2>
            </div>
            <div class="p-4">
              <img src={icone} class="mx-auto d-block"/>
            </div>
            <div class="card-body">
                <h3>Cidade:</h3>
                <h3>Endereço:</h3>
                <h3>Número de membros:</h3>
            </div>
        </div>
      </body>
    </html>
  );
}

export default Instituicao;
