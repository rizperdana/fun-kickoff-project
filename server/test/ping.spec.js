const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const server = app.server
chai.should();
chai.use(chaiHttp);

describe("GET /ping", () => {
    it("it should return 200 and a string message", (done) => {
        chai
            .request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.eql("API is running")
                done();
            });
    });
});