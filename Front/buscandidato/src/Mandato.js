import {Header} from './App.js'
import icone from './iconefoto.png';

function Candidato(){
    return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="card p-3">
            <div class="card-header text-center rounded">
                <h2>Partido Sem Nome</h2>
            </div>
            <div class="p-4">
              <img src={icone} class="mx-auto d-block" style={{width:'30vw'}}/>
            </div>
            <div class="card-body">
                <h3>Sigla do partido:</h3>
                <h3>Ano de criação:</h3>
                <h3>Presidente do partido:</h3>
                <h3>Número de deputados federais:</h3>
                <h3>Número de deputados senadores:</h3>
                <h3>Número de vereadores na Câmara Municipal de São Paulo:</h3>
            </div>
        </div>
      </body>
    </html>
    );
}

export default Candidato;