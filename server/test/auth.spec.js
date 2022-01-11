const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const app = require("../app.js");
const server = app.server;

chai.should();
chai.use(chaiHttp);

describe("GET /auth/logout", () => {
    it("should get logout and return the message", (done) => {
        chai
            .request(server)
            .post("/auth/logout")
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal("You have successfully logged out");
                done();
            });
    });
});