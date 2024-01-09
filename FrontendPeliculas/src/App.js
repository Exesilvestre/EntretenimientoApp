import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Directores } from "./components/directores/Directores";
import {Peliculas} from "./components/peliculas/Peliculas"
import { Actores } from "./components/actores/Actores";
import { Cortos } from "./components/cortos/Cortos";
import { Series } from "./components/series/Series";

import ModalDialog from "./components/ModalDialog";


function App() {
  return (
    <>
        <BrowserRouter>
          <ModalDialog/>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/peliculas" element={<Peliculas/>} />
              <Route path="/series" element={<Series/>} />
              <Route path="/cortos" element={<Cortos/>} />
              <Route path="/actores" element={<Actores/>} />
              <Route path="/directores" element={<Directores/>} />
              
              

              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
}
export default App;
