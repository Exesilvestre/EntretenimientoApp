const express = require("express");
const cors = require("cors"); // Agrega esta línea para importar el módulo cors



require("./base-orm/sqlite-init");  // crear base si no existe
// crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body

// Agrega el middleware de CORS antes de las rutas
app.use(cors());





// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const actoresRouter = require("./routes/actores");
app.use(actoresRouter);

const peliculasRouter = require("./routes/peliculas");
app.use(peliculasRouter);

const directoresRouter = require("./routes/directores");
app.use(directoresRouter);

const seriesRouter = require("./routes/series");
app.use(seriesRouter);

const cortosRouter = require("./routes/cortos");
app.use(cortosRouter);




// levantar servidor
if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing




