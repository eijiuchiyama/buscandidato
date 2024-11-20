import {Header, Footer} from './App.js'

function Atualizacoes(){
    return(
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="card p-3">
            <div class="card-header text-center rounded mb-5">
                <h1>Atualizações recentes</h1>
            </div>
            <div>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
              <h3>Atualização</h3>
            </div>
        </div>
        <Footer />
      </body>
    </html>
    );
}

export default Atualizacoes;