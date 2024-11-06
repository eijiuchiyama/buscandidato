import {Header} from './App.js'

function Orgao(){
    return (
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="container rounded p-4" style={{backgroundColor: '#ffffff'}}>
            <div class="text-center">
                <h2>Câmara dos Deputados</h2>
                <h1>Orgao 1</h1>
            </div>
            <div>
                <h2>Sigla:</h2>
                <h2>Apelido:</h2>
                <h2>Sala:</h2>
            </div>
        </div>
      </body>
    </html>
    );
}

export default Orgao;