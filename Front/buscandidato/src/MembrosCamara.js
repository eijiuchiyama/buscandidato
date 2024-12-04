import {Header, Footer} from './App.js'
import ListEntry from './components/ListEntry.js'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cartao = ({ cpf, nome, partido, foto }) =>(
    <div className="col-md-auto">
        {/* cartao do candidato*/}
        <div className="card text-bg-light mb-3" style={{'max-width': '540px'}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={foto} className="img-fluid rounded-start" style={{'height': '152px'}} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title">
                            <Link to={`/candidato/${cpf}`} style={{color:"black", textDecoration: "none"}}><ListEntry text={nome}/></Link>
                        </h4>
                        <h5 className="card-text">{partido}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

function MembrosCamara(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/politicos/') // URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
    return(
      <html>
        <head>
          <link href=" https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css " rel="stylesheet"></link>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </head>
        <body className="container p-3" style={{backgroundColor: '#d8d8d8'}}>
        <Header />
          <div class="card p-3">
            <div class="card-header text-center rounded mb-5">
                <h3>Câmara dos Deputados</h3>
                <h1>Lista de todos os Membros</h1>
            </div>
            {/* container dinamico dos candidatos */}
            <div className="container text-center">
                <div className="row justify-content-md-center">
                    {data.map((item) => (
                    <Cartao cpf={item.pk} nome={item.fields.Nome} partido={item.fields.Partido_Atual} foto={item.fields.Foto} />
                    ))}
                </div>
            </div>
            <div className="text-center d-grid gap-2">
              <button>Lista de membros</button>
              <button>Frentes</button>
            </div>
        </div>
        <Footer/>
      </body>
    </html>
  );
}

export default MembrosCamara;
