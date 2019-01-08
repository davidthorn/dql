/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import DQLAuthenticationManager from "../../src/DQLAuthenticationManager";
import { expect } from 'chai'

@suite('DQLAuthenticationManager - retrieveAuthenticationInfo')
export class DQLAuthenticationManagerUnitTest extends DQLAuthenticationManager {

    @test "should return user 'davidthorn' and password '123456:654321' when called with 'davidthorn:123456:654321' as Basic Authentication"() {

        const user = 'davidthorn'
        const pass = '123456:654321'
        const data = Buffer.from(`${user}:${pass}`).toString('base64')
        const header = `Basic ${data}`

        const result = this.retrieveAuthenticationInfo('Basic', header)
        expect(result).to.not.be.undefined
        expect(result!.token).to.equal(data)
    }

    @test "should return user 'davidthorn' and password '123456:654321' when called with 'davidthorn:123456:654321' as Bearer Authentication"() {

        const user = 'davidthorn'
        const pass = '123456:654321'
        const data = Buffer.from(`${user}:${pass}`).toString('base64')
        const header = `Bearer ${data}`

        const result = this.retrieveAuthenticationInfo('Bearer', header)
        expect(result).to.not.be.undefined
        expect(result!.token).to.equal(data)
    }

    @test "should return undefined when header is undefined"() {
        const result = this.retrieveAuthenticationInfo('Basic' , undefined)
        expect(result).to.be.undefined

        const result1 = this.retrieveAuthenticationInfo('Bearer' , undefined)
        expect(result1).to.be.undefined
    }
    
}
 