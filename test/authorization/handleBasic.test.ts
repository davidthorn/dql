/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import DQLAuthenticationManager from "../../src/DQLAuthenticationManager";
import chai,{expect} from 'chai'
chai.use(require('chai-http'));

@suite('DQLAuthenticationManager - handleBasic')
export class DQLAuthenticationManagerUnitTest extends DQLAuthenticationManager {

    host: string = 'localhost:3000'

    @test "should return user 'davidthorn' and password '123456' when called with 'davidthorn:123456'"() {

       

        // chai.request(this.host)
        // .post('/people')
        // .send({
        //     name: 'david',
        //     surname: 'thorn',
        //     age: 40,
        //     dob: '22 12 1978'
        // })
        // .end((error, res) => {
        //     expect(res.status).to.be.equal(200)
        // })


    }

    
}
