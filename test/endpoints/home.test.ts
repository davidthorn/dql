/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>


import chai,{expect} from 'chai'
chai.use(require('chai-http'));

@suite('Home Endpoint')
export class HomeEndpointUnitTest {

    host: string = 'localhost:3000'

    @test "POST /home 200" () {

        chai.request(this.host)
        .post('/home')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(200)
        })

    }

    @test "POST /home 400 - invalid body data" () {

        chai.request(this.host)
        .post('/home')
        .type('json')
        .send({
            name: 1
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(400)
        })

    }

    @test "GET /home/index.html 404" () {

        chai.request(this.host)
        .get('/home/index.html')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(404)
        })

    }

    @test "PATCH /home 405" () {

        chai.request(this.host)
        .patch('/home')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        })

    }

    @test "DELETE /home 405" () {

        chai.request(this.host)
        .del('/home')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        })

    }

    @test "GET /home 405" () {

        chai.request(this.host)
        .get('/home')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        }) 

    }

}
