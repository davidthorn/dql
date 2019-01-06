/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>


import chai,{expect} from 'chai'
chai.use(require('chai-http'));

@suite('People Endpoint')
export class PeopleEndpointUnitTest {

    host: string = 'localhost:3000'

    @test "POST /people 200" () {

        chai.request(this.host)
        .post('/people')
        .type('json')
        .send({
            name: 'david',
            surname: 'thorn',
            age: 40,
            dob: '22 12 1978'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(200)
        })

    }

    @test "POST /people 400 - invalid body data" () {

        chai.request(this.host)
        .post('/people')
        .type('json')
        .send({
            name: 1
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(400)
        })

    }

    @test "GET /people/index.html 404" () {

        chai.request(this.host)
        .get('/people/index.html')
        .end((error, res) => {
            expect(res.status).to.be.equal(405)
        })

    }

    @test "PATCH /people/:id 405" () {

        chai.request(this.host)
        .patch('/people/10')
        .type('json')
        .send({
            name: 'david',
            surname: 'thorn',
            age: 40,
            dob: '22 12 1978'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(200)
        }) 

    }

    @test "DELETE /people/:id 405" () {

        chai.request(this.host)
        .del('/people/10')
        .type('json')
        .end((error, res) => {
            expect(res.status).to.be.equal(200)
        })

    }

    @test "GET /people 200" () {

        chai.request(this.host)
        .get('/people')
        .end((error, res) => {
            expect(res.status).to.be.equal(200)
        }) 

    }

}
