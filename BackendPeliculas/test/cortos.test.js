const request = require("supertest");
const app = require("../index");

const cortoAlta = {
    Nombre: "Nuevo corto",
    FechaEstreno: "10/26/2022",
    duracionMinutos: 25
};
  
const cortoModificacion = {
    Nombre: "corto modificado",
    FechaEstreno: "5/15/2023",
    duracionMinutos: 18
};  

const db = require("aa-sqlite");
// Reiniciar la base de datos después de todas las pruebas
async function resetDatabase() {
  // Crear una nueva conexión a la base de datos
  await db.open("./.data/tpi.db");

  // Ejecutar la sentencia DROP TABLE para eliminar todas las tablas existentes
  await db.run("DROP TABLE cortos");
  // ...

  // Cerrar la conexión a la base de datos
  await db.close();
}

// test route/cortos GET
describe("GET /api/cortos", () => {
    it("Deberia devolver todos los cortos", async () => {
      const res = await request(app).get("/api/cortos");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdCorto: expect.any(Number),
            Nombre: expect.any(String),
            FechaEstreno: expect.any(String),
            duracionMinutos: expect.any(Number),
          }),
        ])
      );
    });
  });
  
  


// test route/cortos/:id GET
describe("GET /api/cortos/:id", () => {
    it("Deberia devolver el corto con el id 1", async () => {
      const res = await request(app).get("/api/cortos/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdCorto: expect.any(Number),
          Nombre: expect.any(String),
          FechaEstreno: expect.any(String),
          duracionMinutos: expect.any(Number),
        })
      );
    });
  });
  

// test route/cortos POST
describe("POST /api/cortos", () => {
    it("Deberia devolver el corto que acabo de crear", async () => {
      const res = await request(app).post("/api/cortos").send(cortoAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Nombre: expect.any(String),
          FechaEstreno: expect.any(String),
          duracionMinutos: expect.any(Number),
        })
      );
    });
  });
  
  
// test route/cortos/:id PUT
describe("PUT /api/cortos/:id", () => {
    it("Deberia devolver el corto con el id 1 modificado", async () => {
      const res = await request(app).put("/api/cortos/1").send(cortoModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  
  
// test route/cortos/:id DELETE
describe("DELETE /api/cortos/:id", () => {
    it("Deberia devolver el corto con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/cortos/1");
      expect(res.statusCode).toEqual(200);
    
    
    });
  });

afterAll(async () => {
  await resetDatabase();
});