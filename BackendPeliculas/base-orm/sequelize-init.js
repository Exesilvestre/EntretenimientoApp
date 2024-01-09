// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/tpi.db");

// definicion del modelo de datos
const peliculas = sequelize.define(
  "peliculas",
  {
    IdPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [0, 30],
          msg: "Nombre debe ser tipo carateres, entre 0 y 30 de longitud",
        },
      },
    },
    FechaEstreno: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
      },
    CantidadPersonajes: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (peliculas, options) {
        if (typeof peliculas.Nombre === "string") {
            peliculas.Nombre = peliculas.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

//directores
const directores = sequelize.define(
  "directores",
  {
    IdDirector: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [4, 40],
          msg: "Nombre debe ser tipo carateres, entre 4 y 40 de longitud",
        },
      },
    },
    FechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
      },
      Documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [7, 9] // Define la longitud mínima y máxima permitida
        }
      }
      
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (directores, options) {
        if (typeof directores.Nombre === "string") {
            directores.Nombre = directores.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

// definicion series
const series = sequelize.define(
  "series",
  {
    IdSerie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [4, 30],
          msg: "Nombre debe ser tipo carateres, entre 4 y 30 de longitud",
        },
      },
    },
    FechaEstreno: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
    },    
    CantTemporadas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (series, options) {
        if (typeof series.Nombre === "string") {
            series.Nombre = series.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);
const cortos = sequelize.define(
  "cortos",
  {
    IdCorto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [4, 30],
          msg: "Nombre debe ser tipo carateres, entre 4 y 30 de longitud",
        },
      },
    },
    FechaEstreno: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
      },
    duracionMinutos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (cortos, options) {
        if (typeof cortos.Nombre === "string") {
            cortos.Nombre = cortos.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const actores = sequelize.define(
  "actores",
  {
    IdActor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [3, 55],
          msg: "Nombre debe ser tipo carateres, entre 3 y 55 de longitud",
        },
      },
    },
    Apellido: {
        // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Apellido es requerido",
          },
          len: {
            args: [4, 30],
            msg: "Apellido debe contener SOLO caracteres, entre 4 y 30 de longitud",
          },
        },
      },
    FechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0],
        },
      },
      Nacionalidad: {
        // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nacionalidad es requerida",
          },
          len: {
            args: [4, 30],
            msg: "Nacionalidad debe ser tipo carateres, entre 4 y 30 de longitud",
          },
        },
      },
      Premios: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (actores, options) {
        if (typeof actores.Nombre === "string") {
            actores.Nombre = actores.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
    sequelize,
    peliculas,
    directores,
    series,
    cortos,
    actores,
  };
  
