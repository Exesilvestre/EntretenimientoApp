const express = require('express');
const router = express.Router();
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

router.get("/api/peliculas", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de articulos con filtros y paginacion

  if (req.query.Pagina) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.peliculas.findAndCountAll({
      attributes: [
        "IdPelicula",
        "Nombre",
        "FechaEstreno",
        "CantidadPersonajes",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
    
  } else {
    let items = await db.peliculas.findAll({
      attributes: [
        "IdPelicula",
        "Nombre",
        "FechaEstreno",
        "CantidadPersonajes",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
});


router.get("/api/peliculas/:id", async function (req, res, next) {
    let data = await db.peliculas.findAll({
      attributes: ["IdPelicula", "Nombre", "FechaEstreno", "CantidadPersonajes"],
      where: { IdPelicula: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

router.post("/api/peliculas/", async (req, res) => {
    try {
      let data = await db.peliculas.create({
        Nombre: req.body.Nombre,
        FechaEstreno: req.body.FechaEstreno,
        CantidadPersonajes: req.body.CantidadPersonajes,
      });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
  
router.put("/api/peliculas/:id", async (req, res) => {
    try {
      let item = await db.peliculas.findOne({
        attributes: [
          "IdPelicula",
          "Nombre",
          "FechaEstreno",
          "CantidadPersonajes",
        ],
        where: { IdPelicula: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Pelicula no encontrado" });
        return;
      }
      item.Nombre = req.body.Nombre;
      item.FechaEstreno = req.body.FechaEstreno;
      item.CantidadPersonajes= req.body.CantidadPersonajes;
      await item.save();
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
});
  
router.delete("/api/peliculas/:id", async (req, res) => {
  try {
    let filasBorradas = await db.peliculas.destroy({
      where: { IdPelicula: req.params.id },
    });
    if (filasBorradas === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      const messages = err.errors.map((x) => x.message);
      res.status(400).json(messages);
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

  

module.exports = router;


 