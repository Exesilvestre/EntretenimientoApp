import {config} from "../config";
import httpService from "./http.service";


const urlResource = config.urlResourceActores;


async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdActor);
  return resp.data;
}



async function Grabar(item) {
  if (item.IdActor === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdActor, item);
  }
}

async function Eliminar(item) {
    await httpService.delete(urlResource + "/" + item.IdActor);
}
  


export const actoresService = {
  Buscar,BuscarPorId,Grabar,Eliminar
};



