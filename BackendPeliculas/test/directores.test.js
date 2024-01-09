const request = require("supertest");
const app = require("../index");

const directorAlta = {
    Nombre: "Nuevo director",
    FechaNacimiento: "1995-04-15",
    Documento: 24923926,
};
  
const directorModificacion = {
    Nombre: "Director modificado",
    FechaNacimiento: "1992-01-01",
    Documento: 43124641,
};

const db = require("aa-sqlite");
// Reiniciar la base de datos después de todas las pruebas
async function resetDatabase() {
  // Crear una nueva conexión a la base de datos
  await db.open("./.data/tpi.db");

  // Ejecutar la sentencia DROP TABLE para eliminar todas las tablas existentes
  await db.run("DROP TABLE directores");
  // ...

  // Cerrar la conexión a la base de datos
  await db.close();
}

// test route/directores GET
describe("GET /api/directores", () => {
    it("Deberia devolver todos los directores", async () => {
      const res = await request(app).get("/api/directores");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdDirector: expect.any(Number),
            Nombre: expect.any(String),
            FechaNacimiento: expect.any(String),
            Documento: expect.any(Number),
          }),
        ])
      );
    });
  });
  
  


// test route/directores/:id GET
describe("GET /api/directores/:id", () => {
    it("Deberia devolver el director con el id 1", async () => {
      const res = await request(app).get("/api/directores/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdDirector: expect.any(Number),
          Nombre: expect.any(String),
          FechaNacimiento: expect.any(String),
          Documento: expect.any(Number),
        })
      );
    });
  });
  

// test route/directores POST
describe("POST /api/directores", () => {
    it("Deberia devolver el director que acabo de crear", async () => {
      const res = await request(app).post("/api/directores").send(directorAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Nombre: expect.any(String),
          FechaNacimiento: expect.any(String),
          Documento: expect.any(Number),
        })
      );
    });
  });
  
  
// test route/directores/:id PUT
describe("PUT /api/directores/:id", () => {
    it("Deberia devolver el director con el id 1 modificado", async () => {
      const res = await request(app).put("/api/directores/1").send(directorModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  
  
// test route/directores/:id DELETE
describe("DELETE /api/directores/:id", () => {
    it("Deberia devolver el director con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/directores/1");
      expect(res.statusCode).toEqual(200);
    
    
    });
  });

afterAll(async () => {
  await resetDatabase();
});  