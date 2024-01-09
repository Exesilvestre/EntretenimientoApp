import {config} from "../config";
import httpService from "./http.service";


const urlResource = config.urlResourceDirectores;


async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdDirector);
  return resp.data;
}



async function Grabar(item) {
  if (item.IdDirector === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdDirector, item);
  }
}

async function Eliminar(item) {
  await httpService.delete(urlResource + "/" + item.IdDirector);
}


export const directoresService = {
  Buscar,BuscarPorId,Grabar,Eliminar
};

/*import axios from "axios";

const urlResource = "http://localhost:4000/api/directores";

async function Buscar(Nombre, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdDirector);
  return resp.data;
}

async function Grabar(item) {
  if (item.IdDirector === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdDirector, item);
  }
}

export const directoresService = {
  Buscar,BuscarPorId,Grabar
};*/

