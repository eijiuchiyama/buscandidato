import {Header} from './App.js'
import ListEntry from './components/ListEntry.js'

function ListaPartidos(){
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
                <h1>Lista de todos os Partidos</h1>
            </div>
            <div class="card-body text-center">
              <ListEntry text="Partido A"/>
              <ListEntry text="Partido B"/>
            </div>
        </div>
      </body>
    </html>
    );
}

export default ListaPartidos;
