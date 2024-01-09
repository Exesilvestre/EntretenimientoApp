import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand">
        <i className="fa fa-bullhorn"></i>
        &nbsp;<i>Pymes</i>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/peliculas">
              Peliculas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/series">
              Series
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cortos">
              Cortos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/actores">
              Actores
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/directores">
              Directores
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Menu;
