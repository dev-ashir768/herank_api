import request from "supertest";
import app from "../app";

describe("Health API", () => {
  it("should return a 200 OK status on the health route", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(1);
    expect(res.body.message).toBe("Server is running...");
  });

  it("should return a 404 for an unknown route", async () => {
    const res = await request(app).get("/unknown-not-exist");
    expect(res.status).toBe(404);
  });
});
