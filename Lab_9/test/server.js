// Imports the server.js file to be tested.
let server = require("../server");
//Assertion (Test Driven Development) and Should, Expect(Behaviour driven development) library
let chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
var assert = chai.assert;




describe("Server!", () => {

    // Sample test case given to test / endpoint.
    it("Returns the default welcome message", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          assert.strictEqual(res.body.message, "Welcome!");
          done();
        });
    });

    // Please add your test cases here.

    it("Returns a list of operations", done => {
      chai
        .request(server)
        .get("/operations")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(Array.isArray(res.body)).to.equals(true);
          expect(res.body.length > 0).to.equals(true);
          done();
        });
    });

    it("Returns the details of operation based on the ID passed", done => {
      chai
        .request(server)
        .get("/operations/1")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.id).to.equals(1);
          expect(res.body.name).to.not.equals(undefined);
          expect(res.body.sign).to.not.equals(undefined);
          done();
        });
    });

    it("Allows us to add a new operation to the ops list in server.js", done => {
      chai
        .request(server)
        .post("/operations")
        .send({
          name: "Divide",
          sign: "/"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.id).to.equals(4);
          expect(res.body.name).to.equals("Divide");
          expect(res.body.sign).to.equals("/");
          done();
        });
    });

    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;

    it("Allows us to sum two numbers", done => {
      chai
        .request(server)
        .post("/add")
        .send({
          num1: num1,
          num2: num2
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.value).to.equals(num1 + num2);
          done();
        });
    });

    it("Allows us to divide two numbers", done => {
      chai
        .request(server)
        .post("/divide")
        .send({
          num1: num1,
          num2: num2
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.value).to.equals(num1 / num2);
          done();
        });
    });

    it("Throws error with undefined addition inputs", done => {
      chai
        .request(server)
        .post("/add")
        .send({
          num1: undefined,
          num2: num2
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Throws error with undefined division inputs", done => {
      chai
        .request(server)
        .post("/add")
        .send({
          num1: undefined,
          num2: num2
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Throws error when dividing by zero", done => {
      chai
        .request(server)
        .post("/divide")
        .send({
          num1: num1,
          num2: 0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
