/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>


import chai,{expect} from 'chai'
chai.use(require('chai-http'));

@suite('Register Endpoint')
export class LoginEndpointUnitTest {

    host: string = 'localhost:3000'

    @test "POST /register 400" () {
       
        chai.request(this.host)
        .post('/register')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            expect(res.body.error).to.not.undefined
            expect(res.body.error.code).to.not.undefined
            expect(res.body.error.message).to.not.undefined
            expect(res.body.error.message).to.equal('EMAIL_EXISTS')
            expect(res.body.error.errors).to.not.undefined
            expect(res.status).to.be.equal(400)
        })

    }

    @test "POST /register 401 INVALID_PASSWORD" () {
       
        chai.request(this.host)
        .post('/register')
        .type('json')
        .send({
            email: "new-user@test.com",
            password: "123"
        })
        .end((error, res) => {
            expect(res.body.error).to.not.undefined
            expect(res.body.error.code).to.not.undefined
            expect(res.body.error.message).to.not.undefined
            expect(res.body.error.message).to.equal('WEAK_PASSWORD : Password should be at least 6 characters')
            expect(res.body.error.errors).to.not.undefined
            expect(res.status).to.be.equal(400)
        })

    }

    @test "POST /register 401 INVALID_EMAIL" () {
       
        chai.request(this.host)
        .post('/register')
        .type('json')
        .send({
            email: "invalid email",
            password: "wrong password"
        })
        .end((error, res) => {
            expect(res.body.error).to.not.undefined
            expect(res.body.error.code).to.not.undefined
            expect(res.body.error.message).to.not.undefined
            expect(res.body.error.message).to.equal('INVALID_EMAIL')
            expect(res.body.error.errors).to.not.undefined
            expect(res.status).to.be.equal(400)
        })

    }

    @test "POST /register 400 - invalid body data" () {

        chai.request(this.host)
        .post('/register')
        .type('json')
        .send({
            email: "test-user@test.com"
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(400)
        })

    }

    @test "PATCH /register 405" () {

        chai.request(this.host)
        .patch('/register')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        }) 

    }

    @test "DELETE /register 405" () {

        chai.request(this.host)
        .del('/register')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        })

    }
 
    @test "GET /register 405" () {

        chai.request(this.host)
        .get('/register')
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        }) 

    }

}
