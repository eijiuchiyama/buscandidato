import {Header, Footer} from './App.js';
import icone from './iconefoto.png';
import Tabs from './components/Tabs.js';

function Candidato(){
    const tabData = [
        { label: 'Despesas', content: 'Aqui estão as despesas detalhadas.' },
        { label: 'Frentes', content: 'Aqui estão as frentes que ele participou.' },
        { label: 'Votações', content: 'Aqui estão as votações em que ele participou.' },
        { label: 'Proposições', content: 'Aqui estão as proposições que ele propôs.' },
    ];

    return(
        <html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
            <link href="components/tabs.css" rel="stylesheet"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </head>
        <body class="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
        <div className="tabs-container">
            <div className="App">
                <h1 className="geeks">Fulano da Silva</h1>
                <h2 className="geeks">Mandato Vereador SP 2020-2024</h2>
                <Tabs tabs={tabData} />
            </div>
        </div>
        <Footer/>
        </body>
        </html>
    );
}

export default Candidato;
