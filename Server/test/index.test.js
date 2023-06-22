const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });

    it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async () => {
      const response = await agent.get("/rickandmorty/character/1").expect(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("species");
      expect(response.body).toHaveProperty("gender");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("origin");
      expect(response.body).toHaveProperty("image");
    });

    it("Si hay un error responde con status: 500", async () => {
      await agent.get("/rickandmorty/character/9999").expect(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("Obtiene un objeto con la propiedad 'access' igual a true cuando se proporciona información de login correcta", async () => {
      const email = "nicolasgarcia9812@hotmail.com";
      const password = "12345678";
      const response = await agent
        .get(`/rickandmorty/login?email=${email}&password=${password}`)
        .expect(200);
      expect(response.body).toEqual({ access: true });
    });

    it("Obtiene un objeto con la propiedad 'access' igual a false cuando se proporciona información de login incorrecta", async () => {
      const email = "incorrecto@ejemplo.com";
      const password = "passwordincorrecta";
      const response = await agent
        .get(`/rickandmorty/login?email=${email}&password=${password}`)
        .expect(200);
      expect(response.body).toEqual({ access: false });
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Devuelve un arreglo con el elemento enviado por body", async () => {
      const character = { id: 123, name: "Rick Sanchez" };
      const response = await agent
        .post("/rickandmorty/fav")
        .send(character)
        .expect(200);
      expect(response.body).toEqual([character]);
    });

    it("Devuelve un arreglo que incluye los elementos enviados previamente", async () => {
      const character1 = { id: 456, name: "Morty Smith" };
      const character2 = { id: 789, name: "Summer Smith" };
      await agent.post("/rickandmorty/fav").send(character1).expect(200);
      const response = await agent
        .post("/rickandmorty/fav")
        .send(character2)
        .expect(200);
      expect(response.body).toContainEqual(character1);
      expect(response.body).toContainEqual(character2);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
it('Devuelve un arreglo sin modificar si no hay personaje con el ID enviado', async () => {


  const response = await app.request.delete(`/rickandmorty/fav/${validId}`).expect(200);
  expect(response.body).toEqual(previousFavorites);
});


    it("Elimina correctamente al personaje cuando se envía un ID válido", async () => {
      const validId = 123;
      const previousFavorites = [{ id: 456, name: "Morty Smith" }];
      await agent
        .post("/rickandmorty/fav")
        .send(previousFavorites[0])
        .expect(200);
      const response = await agent
        .delete(`/rickandmorty/fav/${validId}`)
        .expect(200);
      expect(response.body).toEqual(previousFavorites);
    });
  });
});
