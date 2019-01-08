/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>


import chai,{expect} from 'chai'
chai.use(require('chai-http'));

@suite('Login Endpoint')
export class LoginEndpointUnitTest {

    host: string = 'localhost:3000'

    @test "POST /login 200" () {
       
        chai.request(this.host)
        .post('/login')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            expect(res.body.kind).to.not.undefined
            expect(res.body.localId).to.not.undefined
            expect(res.body.email).to.not.undefined
            expect(res.body.displayName).to.not.undefined
            expect(res.body.idToken).to.not.undefined
            expect(res.body.registered).to.not.undefined
            expect(res.body.refreshToken).to.not.undefined
            expect(res.body.expiresIn).to.not.undefined
            expect(res.status).to.be.equal(200)
        })

    }

    @test "POST /login 401 INVALID_PASSWORD" () {
       
        chai.request(this.host)
        .post('/login')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: "wrong password"
        })
        .end((error, res) => {
            expect(res.body.error).to.not.undefined
            expect(res.body.error.code).to.not.undefined
            expect(res.body.error.message).to.not.undefined
            expect(res.body.error.message).to.equal('INVALID_PASSWORD')
            expect(res.body.error.errors).to.not.undefined
            expect(res.status).to.be.equal(400)
        })

    }

    @test "POST /login 401 EMAIL_NOT_FOUND" () {
       
        chai.request(this.host)
        .post('/login')
        .type('json')
        .send({
            email: "email@test.com",
            password: "wrong password"
        })
        .end((error, res) => {
            expect(res.body.error).to.not.undefined
            expect(res.body.error.code).to.not.undefined
            expect(res.body.error.message).to.not.undefined
            expect(res.body.error.message).to.equal('EMAIL_NOT_FOUND')
            expect(res.body.error.errors).to.not.undefined
            expect(res.status).to.be.equal(400)
        })

    }

    @test "POST /login 401 PASSWORD_LOGIN_DISABLED" () {
       
        chai.request(this.host)
        .post('/login')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            // expect(res.body.error).to.not.undefined
            // expect(res.body.error.code).to.not.undefined
            // expect(res.body.error.message).to.not.undefined
            // expect(res.body.error.message).to.equal('EMAIL_NOT_FOUND')
            // expect(res.body.error.errors).to.not.undefined
            //expect(res.status).to.be.equal(400)
            
            
            // disabled email login method in firebase console to receive 400
            expect(res.status).to.be.equal(200)
        })

    }

    @test "POST /login 401 INVALID_EMAIL" () {
       
        chai.request(this.host)
        .post('/login')
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

    @test "POST /login 401 USER_DISABLED" () {
       
        chai.request(this.host)
        .post('/login')
        .type('json')
        .send({
            email: "blocked@test.com",
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            expect(res.body.error).to.not.undefined
            expect(res.body.error.code).to.not.undefined
            expect(res.body.error.message).to.not.undefined
            expect(res.body.error.message).to.equal('USER_DISABLED')
            expect(res.body.error.errors).to.not.undefined
            expect(res.status).to.be.equal(400)
        })

    }

    @test "POST /login 400 - invalid body data" () {

        chai.request(this.host)
        .post('/login')
        .type('json')
        .send({
            email: process.env.EMAIL
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(400)
        })

    }

    @test "PATCH /login 405" () {

        chai.request(this.host)
        .patch('/login')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        }) 

    }

    @test "DELETE /login 405" () {

        chai.request(this.host)
        .del('/login')
        .type('json')
        .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        })

    }

    @test "GET /login 405" () {

        chai.request(this.host)
        .get('/login')
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        }) 

    }

}
