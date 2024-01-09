const express = require('express');
const router = express.Router();
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

router.get("/api/series", async function (req, res, next) {
  // #swagger.tags = ['Directores']
  // #swagger.summary = 'obtiene todos los Directores'
  // consulta de directores con filtros y paginacion

  if (req.query.Pagina) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.series.findAndCountAll({
      attributes: [
        "IdSerie",
        "Nombre",
        "FechaEstreno",
        "CantTemporadas",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
    
  } else {
    let items = await db.series.findAll({
      attributes: [
        "IdSerie",
        "Nombre",
        "FechaEstreno",
        "CantTemporadas",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
});

router.get("/api/series/:id", async function (req, res, next) {
    let data = await db.series.findAll({
      attributes: ["IdSerie", "Nombre", "FechaEstreno", "CantTemporadas"],
      where: { IdSerie: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No encontrado!'})
  });

router.post("/api/series/", async (req, res) => {
    try {
      let data = await db.series.create({
        Nombre: req.body.Nombre,
        FechaEstreno: req.body.FechaEstreno,
        CantTemporadas: req.body.CantTemporadas,
      });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado
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
  
router.put("/api/series/:id", async (req, res) => {
    try {
      let item = await db.series.findOne({
        attributes: [
          "IdSerie",
          "Nombre",
          "FechaEstreno",
          "CantTemporadas"
        ],
        where: { IdSerie: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Serie no encontrada" });
        return;
      }
      item.Nombre = req.body.Nombre;
      item.FechaEstreno = req.body.FechaEstreno;
      item.CantTemporadas = req.body.CantTemporadas;
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
  
router.delete("/api/series/:id", async (req, res) => {
  try {
    let filasBorradas = await db.series.destroy({
      where: { IdSerie: req.params.id },
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
