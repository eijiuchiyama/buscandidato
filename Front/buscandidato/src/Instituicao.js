import './Instituicao.css';

function Instituicao(){
    return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body>
        <div class="container-fluid p-5 text-center">
          <h1>BusCandidato</h1>
        </div>
        <div class="card">
            <div class="card-header">
                <h2>Senado</h2>
            </div>
            <img src={icone} class="mx-auto d-block"/>
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