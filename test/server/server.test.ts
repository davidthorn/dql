/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>


import chai,{expect} from 'chai'
chai.use(require('chai-http'));

@suite('DQL Server ')
export class T {

    host: string = 'localhost:3000'

    @test "/app 200" () {

        chai.request(this.host)
        .post('/app')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(200)
        })

    }

    @test "/app 404" () {

        chai.request(this.host)
        .post('/unknown')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.body.message , 'res.body.statusCode').to.equal('Not Found')
        })

    }

    @test "/ 200" () {

        chai.request(this.host)
        .post('/')
        .type('json')
        .send({
            name: 'david'
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(200)
        })

    }

    @test "/app 400 with string property with a boolean value" () {

        chai.request(this.host)
        .post('/app')
        .type('form')  
        .send({ 
            name: true
        }) 
        .end((error, res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body.message).to.not.be.undefined
            expect(res.body.statusCode).to.be.not.undefined
        }) 

    }

    @test "/app 400 with string property with a number value" () {

        chai.request(this.host)
        .post('/app')
        .type('form')
        .send({
            name: 1
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body.message).to.not.be.undefined
            expect(res.body.statusCode).to.not.be.undefined
        }) 

    }

    @test "/app 400 with boolean property with a number value" () {

        chai.request(this.host)
        .post('/app')
        .type('json')
        .send({
            
            name: 'david',
            isOld: 1 
        })
        .end((error, res) => {
            expect(res.status).to.be.equal(400)
            expect(res.body.message).to.not.be.undefined
            expect(res.body.statusCode).to.not.be.undefined
        }) 

    }
 
}
