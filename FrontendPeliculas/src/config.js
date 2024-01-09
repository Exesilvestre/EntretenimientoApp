//const urlServidor = "http://localhost:3000"
//const urlServidor = "https://dds-backend.azurewebsites.net"
const urlServidor = 'http://localhost:4000';

const urlResourceActores = urlServidor + '/api/actores';
const urlResourceDirectores = urlServidor + '/api/directores';
const urlResourcePeliculas = urlServidor + '/api/peliculas';
const urlResourceCortos = urlServidor + '/api/cortos';
const urlResourceSeries = urlServidor + '/api/series';

export const config = {
  urlServidor,
  urlResourceDirectores,
  urlResourcePeliculas,
  urlResourceActores,
  urlResourceCortos,
  urlResourceSeries,

};

