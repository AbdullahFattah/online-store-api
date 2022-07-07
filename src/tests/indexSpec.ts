import supertest from "supertest";
import app from "../index";
const request = supertest(app);

describe("Testing main enpoint", () => {
  it("Runs the main API endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
