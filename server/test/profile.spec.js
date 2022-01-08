const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("GET /profiles", () => {
    it("it should return 200 along with all user profiles", async() => {
        // TODO: adding profile table injection, for now we only check if
        // profile endpoint is accessible
        const res = await chai.request(app).get('/profiles');

        res.should.have.status(200);
        // TODO: adding more detail test
    })
})