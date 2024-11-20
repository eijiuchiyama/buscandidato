import {Header, Footer} from './App.js'

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
            <div class="text-center mb-5">
                <h3>Câmara dos Deputados</h3>
                <h1>Órgão 1</h1>
            </div>
            <div>
                <h3>Sigla:</h3>
                <h3>Apelido:</h3>
                <h3>Sala:</h3>
            </div>
        </div>
        <Footer/>
      </body>
    </html>
    );
}

export default Orgao;