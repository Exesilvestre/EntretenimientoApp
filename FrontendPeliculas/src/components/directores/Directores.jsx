import React, { useState, useEffect } from "react";
//import moment from "moment";
import DirectoresBuscar from "./DirectoresBuscar";
import DirectoresListado from "./DirectoresListado";
import DirectoresRegistro from "./DirectoresRegistro";
import { directoresService } from "../../services/directores.service";
import modalDialogService from "../../services/modalDialog.service";



function Directores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);


  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await directoresService.Buscar(Nombre, _pagina);
    modalDialogService.BloquearPantalla(false);

    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);


    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  /*async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await directoresService.Buscar(Nombre, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }*/

  /*async function Buscar() {
    alert("Buscando...");
    // harcodeamos 2 directores para probar
    setItems([
      {
        IdDirector: 108,
        Nombre: "Genaro",
        FechaNacimiento: "2017-01-23T00:00:00",
        Documento: 42185233,
      },
      {
        IdDirector: 139,
        Nombre: "Sopero",
        FechaNacimiento: "2017-01-04T00:00:00",
        Documento: 43423502,
      },
    ]);
  }*/

  /*async function BuscarPorId(item, accionABMC) {
    setAccionABMC(accionABMC);
    setItem(item);
    if (accionABMC === "C") {
      alert("Consultando...");
    }
    if (accionABMC === "M") {
      alert("Modificando...");
    }
  }*/
  async function BuscarPorId(item, accionABMC) {
    const data = await directoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    {
      BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
      return;
    }
    
  }


  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdDirector: 0,
      Nombre: null,
      FechaNacimiento: null, //moment(new Date()).format("YYYY-MM-DD"),
      Documento: null,
    });
  }

  /*function Agregar() {
    setAccionABMC("A");
    alert("preparando el Alta...");
  }*/

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function Eliminar(item) {
    const resp = window.confirm("¿Está seguro que desea eliminar el registro?");
    if (resp) {
      await directoresService.Eliminar(item);
      await Buscar();
    }
  }

  /*async function Grabar(item) {
    alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );

    Volver();
  }*/

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await directoresService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Directores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <DirectoresBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Buscar={Buscar}
        Agregar={Agregar}
      />}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <DirectoresListado
        {...{
          Items,
          Consultar,
          Modificar,
          Eliminar,
          Imprimir,
          Pagina,
          RegistrosTotal,
          Paginas,
          Buscar,
        }}
      />}

      {AccionABMC === "L" && Items?.length === 0 && 
      <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div>}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <DirectoresRegistro
        {...{ AccionABMC, Item, Grabar, Volver }}
      />}
    </div>
  );
}
export { Directores };
