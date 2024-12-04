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
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';


const MenuIcon = () => {
  return (<><i class="bi bi-justify" style={{ fontSize: 20 }}></i></>);
}

function SearchBarContent(){
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  var tag=0;
  const [tagText, setTagText] = useState("Tags");
  const [valorPesquisa, setValorPesquisa] = useState("");

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(tagText == "Candidato")
        navigate(`/resultados/politicos/${valorPesquisa}`);
      else if(tagText == "Partido")
        navigate(`/resultados/partidos/${valorPesquisa}`);
      else
        navigate(`/resultados/tudo/${valorPesquisa}`);
    }
  };

  const clickCandidato = (event) => {
    tag=1;
    console.log(tag);
    setTagText("Candidato");
  };

  const clickPartido = (event) => {
    tag=2;
    console.log(tag);
    setTagText("Partido");
  };

  const clickTudo = (event) => {
    tag=3;
    console.log(tag);
    setTagText("Tags");
  }

  return (
    <>
      {isDesktop &&
      <div class="container">
        <div class="row">
          <div class="col-3" style={{minWidth: '120px', maxWidth:'120px'}}>
            <DropdownMenu optionsList={[
              <div onClick={clickCandidato}>Candidato</div>, 
              <div onClick={clickPartido}>Partido</div>,
              <div onClick={clickTudo}>Tudo</div>]} >
              <h7>{tagText}</h7>
            </DropdownMenu>
          </div>
          <div class="col-9">
             <Form.Control onKeyDown={handleKeyDown} onChange={(e) => setValorPesquisa(e.target.value)}
                placeholder="Procure por um candidato ou político"
              />
          </div>
        </div>
      </div>}
      {isMobile &&
      <div class="container">
        <div class="d-flex align-items-center justify-content-center">
          <div class="mb-3" style={{minWidth: '100px', maxWidth:'100px'}}>
            <DropdownMenu optionsList={[
              <div onClick={clickCandidato}>Candidato</div>, 
              <div onClick={clickPartido}>Partido</div>,
              <div onClick={clickTudo}>Tudo</div>]}>
              <h7>{tagText}</h7>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <Form.Control onKeyDown={handleKeyDown} onChange={(e) => setValorPesquisa(e.target.value)}
            placeholder="Procure por um candidato ou político"
          />
        </div>
      </div>}
    </>
  );
}

function SecondSectionButtons(){
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <>
      {isDesktop &&
      <div class="container-flex">
        <div class="row">
          <div class="col p-3 text-center"> 
          <Link to='/municipal'><Button>Câmara SP</Button></Link>
            <div class="container p-3 mt-3 rounded" style={{backgroundColor: '#55ff55', maxWidth: "250px"}}>
              <img src={camaraMunicipalIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="col p-3 text-center"> 
          <Link to='/deputados'><Button>Câmara dos Deputados</Button></Link> 
            <div class="container p-3 mt-3 rounded" style={{backgroundColor: '#5555ff', maxWidth: "250px"}}>
              <img src={camaraDeputadosIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="col p-3 text-center"> 
            <Link to='/senado'><Button>Senado</Button></Link>
            <div class="container p-3 mt-3 rounded" style={{backgroundColor: '#ff5555', maxWidth: "250px"}}>
              <img src={senadoIcon} class="img-fluid"></img>
            </div>
          </div>
        </div>
      </div>}
      {isMobile &&
      <div class="container-flex">
        <div class="justify-content-center">
          <div class="text-center"> 
          <Link to='/municipal'><Button>Câmara SP</Button></Link>
            <div class="container p-3 mb-5 mt-3 rounded" style={{backgroundColor: '#55ff55', maxWidth: "150px"}}>
              <img src={camaraMunicipalIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="text-center"> 
          <Link to='/deputados'><Button>Câmara dos Deputados</Button></Link> 
            <div class="container p-3 mb-5 mt-3 rounded" style={{backgroundColor: '#5555ff', maxWidth: "150px"}}>
              <img src={camaraDeputadosIcon} class="img-fluid"></img>
            </div>
          </div>
          <div class="text-center"> 
            <Link to='/senado'><Button>Senado</Button></Link>
            <div class="container p-3 mb-5 mt-3 rounded" style={{backgroundColor: '#ff5555', maxWidth: "150px"}}>
              <img src={senadoIcon} class="img-fluid"></img>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export function Header(){
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <>
      {isDesktop && 
      <div class="container m-4">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex flex-grow-1"></div>
          <div class="text-center m-4">
            <Link to='/'><img src={logo} class="img-fluid" alt="BusCandidatoLogo"></img></Link>
          </div>
          <div class="d-flex flex-grow-1 justify-content-end m-5">
            <DropdownMenu optionsList={[
              <div><Link to='/' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Página Inicial</Link></div>, 
              <div><Link to='/lista-politicos/1' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Todos os Políticos</Link></div>, 
              <div><Link to='/lista-partidos/1' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Todos os Partidos</Link></div>, 
              <div><Link to="/atualizacoes" style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Atualizações Recentes</Link></div>, 
              <div><Link to='/sobre' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Sobre o site</Link></div>]}> <MenuIcon/> </DropdownMenu>
          </div>
        </div>
      </div>}
      {isMobile && 
      <div class="container">
        <div class="m-2">
          <Link to='/'><img src={logo} class="img-fluid" alt="BusCandidatoLogo"></img></Link>
        </div>
        <div d-flex align-items-center justify-content-center style={{width: "50px"}}>
          <DropdownMenu optionsList={[
            <div><Link to='/' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Página Inicial</Link></div>, 
            <div><Link to='/lista-politicos/1' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Todos os Políticos</Link></div>, 
            <div><Link to='/lista-partidos/1' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Todos os Partidos</Link></div>, 
            <div><Link to="/atualizacoes" style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Atualizações Recentes</Link></div>, 
            <div><Link to='/sobre' style={{color: "#000000", textDecoration: "none", display: "block", width: "100%"}}>Sobre o site</Link></div>]}> <MenuIcon/> </DropdownMenu>
        </div>
      </div>}
    </>
  );
}

export function Footer(){
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return(
    <>
      {isDesktop && 
      <div class="container">
        <div class="text-center m-5">
          <img src={logo} style={{width:"30%"}} class="img-fluid m-2" alt="BootstrapLogo"></img>
          <h5>2024</h5>
        </div>
      </div>}
      {isMobile && 
      <div class="container">
        <div class="text-center m-5">
          <img src={logo} style={{width:"50%"}} class="img-fluid m-2" alt="BootstrapLogo"></img>
          <h5>2024</h5>
        </div>
      </div>}
    </>
  );
}

function App() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <html>
      <head>
      <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      {isDesktop &&
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="container rounded p-3">
          <div class="row"> <h1 class="text-center"></h1> </div>
          <div class="row">
            <ContentBox header="Digite o nome de um candidato ou partido">
              <SearchBarContent />
            </ContentBox>
          </div>
          <div class="row">
            <ContentBox header="Ou escolha uma casa legislativa">
              <SecondSectionButtons />
            </ContentBox>
          </div>
        </div>
        <Footer/>
      </body>}
      {isMobile &&
      <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div class="container rounded p-3">
          <div class="row"> <h1 class="text-center"></h1> </div>
          <div class="row">
            <ContentBox header="Digite o nome de um candidato ou partido">
              <SearchBarContent />
            </ContentBox>
          </div>
          <div class="row">
            <ContentBox header="Ou escolha uma casa legislativa">
              <SecondSectionButtons />
            </ContentBox>
          </div>
        </div>
        <Footer/>
      </body>}
    </html>
  );
}

export default App;
