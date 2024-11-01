import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './assets/Logo.png'
import camaraDeputadosIcon from './assets/CamaraDeputados.png'
import senadoIcon from './assets/Senado.png'
import camaraMunicipalIcon from './assets/CamaraMunicipal.png'
import DropdownMenu from './components/DropdownMenu.js';
import ContentBox from './components/ContentBox.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MenuIcon = () => {
  return (<><i class="bi bi-justify" style={{ fontSize: 20 }}></i></>);
}

function SearchBarContent(){
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-1">
            <DropdownMenu optionsList={["Candidato", "Partido", "Casa Legislativa"]} >
              <h7>Tags</h7>
            </DropdownMenu>
          </div>
          <div class="col-11">
             <Form.Control
                placeholder="Procure por um candidato ou político"
              />
          </div>
        </div>
      </div>
    </>
  );
}

function SecondSectionButtons(){
  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col text-center"> 
            <Button>Câmara SP</Button> 
            <div class="container p-3 m-3 rounded" style={{backgroundColor: '#55ff55'}}>
              <img src={camaraMunicipalIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="col text-center"> 
            <Button>Câmara dos Deputados</Button> 
            <div class="container p-3 m-3 rounded" style={{backgroundColor: '#5555ff'}}>
              <img src={camaraDeputadosIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="col text-center"> 
            <Button>Senado</Button> 
            <div class="container p-3 m-3 rounded" style={{backgroundColor: '#ff5555'}}>
              <img src={senadoIcon} class="img-fluid"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Header(){
  return (
    <div class="container m-4">
      <div class="row align-items-center">
        <div class="col"></div>
        <div class="col-auto text-center ">
          <img src={logo} class="img-fluid" alt="BusCandidatoLogo"></img>
        </div>
        <div class="col text-end m-5">
          <DropdownMenu optionsList={["Página Inicial", "Todos os Políticos", "Todos os Partidos", "Atualizações Recentes", "Sobre o site"]} > <MenuIcon/> </DropdownMenu>
        </div>
      </div>
    </div>
  
  );
}

function App() {
  return (
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="container rounded p-3">
          <div class="row"> <h1 class="text-center"></h1> </div>
          <div class="row m-5">
            <ContentBox header="Digite o nome de seu candidato ou partido">
              <SearchBarContent />
            </ContentBox>
          </div>
          <div class="row m-5">
            <ContentBox header="Ou escolha uma casa legislativa">
              <SecondSectionButtons />
            </ContentBox>
          </div>
        </div>
      </body>
    </html>
  );
}

export default App;
