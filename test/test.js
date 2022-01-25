const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
    it("responds with Works", (done) => {
        request(app).get("/").expect("Works", done);
    })
});