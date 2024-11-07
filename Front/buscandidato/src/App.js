import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './assets/Logo.png'
import camaraDeputadosIcon from './assets/CamaraDeputados.png'
import senadoIcon from './assets/Senado.png'
import camaraMunicipalIcon from './assets/CamaraMunicipal.png'
import DropdownMenu from './components/DropdownMenu.js';
import ContentBox from './components/ContentBox.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SobreSite from './SobreSite';
import { Link } from "react-router-dom";


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
          <Link to='/municipal'><Button>Câmara SP</Button></Link>
            <div class="container p-3 m-3 rounded" style={{backgroundColor: '#55ff55'}}>
              <img src={camaraMunicipalIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="col text-center"> 
          <Link to='/deputados'><Button>Câmara dos Deputados</Button></Link> 
            <div class="container p-3 m-3 rounded" style={{backgroundColor: '#5555ff'}}>
              <img src={camaraDeputadosIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="col text-center"> 
            <Link to='/senado'><Button>Senado</Button></Link>
            <div class="container p-3 m-3 rounded" style={{backgroundColor: '#ff5555'}}>
              <img src={senadoIcon} class="img-fluid"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Header(){
  return (
    <div class="container m-4">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-grow-1"></div>
        <div class="text-center">
          <Link to='/'><img src={logo} class="img-fluid" alt="BusCandidatoLogo"></img></Link>
        </div>
        <div class="d-flex flex-grow-1 justify-content-end m-5">
          <DropdownMenu optionsList={[
            <Link to='/' style={{color: "#000000", textDecoration: "none"}}>Página Inicial</Link>, 
            <Link to='/candidatos' style={{color: "#000000", textDecoration: "none"}}>Todos os Políticos</Link>, 
            <Link to='/partidos' style={{color: "#000000", textDecoration: "none"}}>Todos os Partidos</Link>, 
            <Link to="/atualizacoes" style={{color: "#000000", textDecoration: "none"}}>Atualizações Recentes</Link>, 
            <Link to='/sobre' style={{color: "#000000", textDecoration: "none"}}>Sobre o site</Link>]}> <MenuIcon/> </DropdownMenu>
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
            <ContentBox header="Digite o nome de um candidato ou partido">
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
