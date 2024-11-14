import {Header} from './App.js'

function SobreSite(){
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
                <h1>Sobre o site</h1>
            </div>
            <div class="card-body text-center">
                <h3>Este site foi criado em 2024 por:</h3>
                <div class="m-5">
                    <h3>Fernando Yang</h3>
                    <h3>João Mantovani</h3>
                    <h3>Lucas dos Anjos</h3>
                    <h3>Lucas Eiji Uchiyama</h3>
                    <h3>Marcelo Spessoto</h3>
                    <h3>Thiago Sikusawa</h3>
                </div>
                <h3>Desenvolvido com React, Bootstrap e Django</h3>
                <h3>Licenciado sob GNU LESSER GENERAL PUBLIC LICENSE 3.0</h3>
            </div>
        </div>
      </body>
    </html>
    );
}

export default SobreSite;