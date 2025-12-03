import request from "supertest";
import { buildServer } from "../../src/server";

describe("Rotas de /transactions", () => {
  const app = buildServer();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve criar uma transação válida via POST /transactions", async () => {
    const payload = {
      pan: "4111111111111111",
      brand: "Visa",
      amount: 500,
    };

    const response = await request(app.server)
      .post("/transactions")
      .send(payload)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toMatchObject({
      brand: "Visa",
      amount: 500,
      status: "approved",
    });

    expect(response.body.pan).toBe("**** **** **** 1111");

    expect(response.body.authorizationCode).toBeDefined();
  });

  it("deve recusar uma transação inválida (bandeira não aceita)", async () => {
    const payload = {
      pan: "4111111111111111",
      brand: "Amex", 
      amount: 500,
    };

    const response = await request(app.server)
      .post("/transactions")
      .send(payload)
      .set("Content-Type", "application/json");


    expect(response.status).toBe(201);
    expect(response.body.status).toBe("declined");
    expect(response.body.reason).toBe("Bandeira não aceita");
  });

  it("deve listar as transações via GET /transactions", async () => {
    const response = await request(app.server).get("/transactions");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBeGreaterThan(0);

    const first = response.body[0];
    expect(first).toHaveProperty("_id");
    expect(first).toHaveProperty("pan");
    expect(first).toHaveProperty("brand");
    expect(first).toHaveProperty("amount");
    expect(first).toHaveProperty("status");
  });
});
