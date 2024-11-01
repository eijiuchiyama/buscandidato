import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './assets/Logo.png'
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
          <div class="col text-center"> <Button>Câmara SP</Button> </div>
          <div class="col text-center"> <Button>Câmara</Button> </div>
          <div class="col text-center"> <Button>Senado</Button> </div>
        </div>
      </div>
    </>
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
      <body>
        <div class="container p-3">
          <div class="row align-items-center">
            <div class="col"></div>
            <div class="col-auto text-center ">
              <img src={logo} class="img-fluid" alt="BusCandidatoLogo"></img>
            </div>
            <div class="col text-end">
              <DropdownMenu optionsList={["Página Inicial", "Todos os Políticos", "Todos os Partidos", "Atualizações Recentes", "Sobre o site"]} > <MenuIcon/> </DropdownMenu>
            </div>
          </div>
        </div>
        <div class="container bg-secondary rounded p-3">
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
