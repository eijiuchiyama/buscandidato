import {Header} from './App.js'
import icone from './iconefoto.png';
import ListEntryPhoto from './components/ListEntryPhoto.js'

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
          <ListEntryPhoto text="Candidato Resultado" photo={icone}/>
        </div>
      </body>
    </html>
    );
}

export default Candidato;
