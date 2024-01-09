import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: 'lightgray' }}>
      <h1>Entretenimiento 2023</h1>
      <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express, WebApiRest, Swagger, Sequelize, Sqlite múltiples capas en Javascript/Typescript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, NodeJs, Javascript y React.
      </p>
      <div className="d-flex align-items-start">
        <div>
          <Link to="/peliculas" className="btn btn-primary mr-3 mb-3" style={{ marginLeft: '20px', marginTop: '30px' }}>
            <i className="fa fa-film"></i> Ver Películas
          </Link>
          <Link to="/series" className="btn btn-primary mr-3 mb-3" style={{ marginLeft: '20px' , marginTop: '30px'}}>
            <i className="fa fa-film"></i> Ver Series
          </Link>
          <Link to="/cortos" className="btn btn-primary mr-3 mb-3" style={{ marginLeft: '20px' , marginTop: '30px'}}>
            <i className="fa fa-film"></i> Ver Cortos
          </Link>
          <Link to="/actores" className="btn btn-primary mr-3 mb-3" style={{ marginLeft: '20px' , marginTop: '30px'}}>
            <i className="fas fa-glasses"></i> Ver Actores
          </Link>
          <Link to="/directores" className="btn btn-primary mr-3 mb-3" style={{ marginLeft: '20px' , marginTop: '30px'}}>
            <i className="fa fa-search"></i> Ver Directores
          </Link>
        </div>
        <div className="rounded-img" style={{ marginTop: '-40px' }}></div> {/* Div para la imagen */}
      </div>
    </div>
  );
}

export { Inicio };

  
