const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const faker = require("faker");
const app = require("../app.js");
const { expect } = require("chai");
const server = app.server;


chai.should();
chai.use(chaiHttp);

describe("Authentication", () => {
    const stubUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    };

    describe("POST /auth/register", () => {
        it("should return 201 and username response", async() => {
            const res = await chai.request(server).post('/auth/register').send(stubUser);

            res.should.have.status(201);
            res.body.should.be.a('object');
            expect(res.body.success.user.id).to.be.a("string");
            expect(res.body.success.user.username).to.be.eql(stubUser.username);
            expect(res.body.success.user.email).to.be.eql(stubUser.email);
        });
    });

    describe("POST /auth/login", () => {
        it("should return 200 and get new token", async() => {
            let loginUser = {
                email: stubUser.email,
                password: stubUser.password
            }
            const res = await chai.request(server).post('/auth/login').send(loginUser);

            res.should.have.status(200);
            res.body.should.be.a('object');
            expect(res.body.success.user.id).to.be.a("string");
            expect(res.body.success.user.username).to.be.eql(stubUser.username);
            expect(res.body.success.user.email).to.be.eql(stubUser.email);
        });
    });

    describe("GET /auth/user", () => {
        it("should get user data with status code 200", async() => {
            let loginUser = {
                email: stubUser.email,
                password: stubUser.password
            }
            const agent = chai.request.agent(server)
            agent
                .post('/auth/login')
                .send(loginUser)
                .then((res) => {
                    expect(res).to.have.cookie('token');
                    return agent.get('/auth/user')
                        .then((res) => {
                            expect(res).to.have.status(200);
                        });
                });
        });
    });

    describe("POST /auth/logout", () => {
        it("should get logout and return the message", async() => {
            const res = await chai.request(server).post("/auth/logout").send({})

            res.should.have.status(200);
            res.text.should.equal("You have successfully logged out");
        });
    });
});