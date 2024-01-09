import {config} from "../config";
import httpService from "./http.service";


const urlResource = config.urlResourceSeries;


async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdSerie);
  return resp.data;
}



async function Grabar(item) {
  if (item.IdSerie === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdSerie, item);
  }
}

async function Eliminar(item) {
    await httpService.delete(urlResource + "/" + item.IdSerie);
}

export const seriesService = {
  Buscar,BuscarPorId,Grabar,Eliminar
};



