const express = require('express');
const router = express.Router();
const { Op, ValidationError } = require("sequelize");

const db = require("../base-orm/sequelize-init");

/*router.get("/api/directores", async function (req, res, next) {
  let data = await db.directores.findAll({
    attributes: ["IdDirector", "Nombre","FechaNacimiento", "Documento"],
  });
  res.json(data);
});*/
router.get("/api/directores", async function (req, res, next) {
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
    const { count, rows } = await db.directores.findAndCountAll({
      attributes: [
        "IdDirector",
        "Nombre",
        "FechaNacimiento",
        "Documento",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
    
  } else {
    let items = await db.directores.findAll({
      attributes: [
        "IdDirector",
        "Nombre",
        "FechaNacimiento",
        "Documento",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
});


router.get("/api/directores/:id", async function (req, res, next) {
    let data = await db.directores.findAll({
      attributes: ["IdDirector", "Nombre", "FechaNacimiento", "Documento"],
      where: { IdDirector: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

router.post("/api/directores/", async (req, res) => {
    try {
      let data = await db.directores.create({
        Nombre: req.body.Nombre,
        FechaNacimiento: req.body.FechaNacimiento,
        Documento: req.body.Documento
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
  
router.put("/api/directores/:id", async (req, res) => {
    try {
      let item = await db.directores.findOne({
        attributes: [
          "IdDirector",
          "Nombre",
          "FechaNacimiento",
          "Documento"
        ],
        where: { IdDirector: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Director no encontrado" });
        return;
      }
      item.Nombre = req.body.Nombre;
      item.FechaNacimiento = req.body.FechaNacimiento;
      item.Documento = req.body.Documento;
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
  
router.delete("/api/directores/:id", async (req, res) => {
  try {
    let filasBorradas = await db.directores.destroy({
      where: { IdDirector: req.params.id },
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