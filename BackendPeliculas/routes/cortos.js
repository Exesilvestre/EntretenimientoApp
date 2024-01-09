const express = require('express');
const router = express.Router();
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

router.get("/api/cortos", async function (req, res, next) {
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
    const { count, rows } = await db.cortos.findAndCountAll({
      attributes: [
        "IdCorto",
        "Nombre",
        "FechaEstreno",
        "duracionMinutos",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
    
  } else {
    let items = await db.cortos.findAll({
      attributes: [
        "IdCorto",
        "Nombre",
        "FechaEstreno",
        "duracionMinutos",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
});
  
  
router.get("/api/cortos/:id", async function (req, res, next) {
      let data = await db.cortos.findAll({
        attributes: ["IdCorto", "Nombre","FechaEstreno","duracionMinutos"],
        where: { IdCorto: req.params.id },
      });
      if (data.length > 0 ) res.json(data[0]);
      else res.status(404).json({mensaje:'No encontrado!!'})
    });
  
router.post("/api/cortos/", async (req, res) => {
      try {
        let data = await db.cortos.create({
          Nombre: req.body.Nombre,
          FechaEstreno: req.body.FechaEstreno,
          duracionMinutos: req.body.duracionMinutos
        });
        res.status(200).json(data.dataValues);
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
    
router.put("/api/cortos/:id", async (req, res) => {
      try {
        let item = await db.cortos.findOne({
          attributes: [
            "IdCorto",
            "Nombre",
            "FechaEstreno",
            "duracionMinutos"
          ],
          where: { IdCorto: req.params.id },
        });
        if (!item) {
          res.status(404).json({ message: "Corto no encontrado" });
          return;
        }
        item.Nombre = req.body.Nombre;
        item.FechaEstreno = req.body.FechaEstreno;
        item.duracionMinutos = req.body.duracionMinutos;
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
    
router.delete("/api/cortos/:id", async (req, res) => {
    try {
      let filasBorradas = await db.cortos.destroy({
        where: { IdCorto: req.params.id },
      });
      if (filasBorradas === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        throw err;
      }
    }
  });
  
module.exports = router;