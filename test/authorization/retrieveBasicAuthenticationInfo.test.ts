/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import DQLAuthenticationManager from "../../src/DQLAuthenticationManager";
import { expect } from 'chai'

@suite('DQLAuthenticationManager - retrieveBasicAuthenticationInfo')
export class DQLAuthenticationManagerUnitTest extends DQLAuthenticationManager {

    @test "should return user 'davidthorn' and password '123456' when called with 'davidthorn:123456'"() {

        const user = 'davidthorn'
        const pass = '123456'
        const data = Buffer.from(`${user}:${pass}`).toString('base64')
        const header = `Basic ${data}`

        const result = this.retrieveBasicAuthenticationInfo(header)
        expect(result).to.not.be.undefined
        expect(result!.user).to.not.be.undefined
        expect(result!.user).to.equal(user)
        expect(result!.password).to.not.be.undefined
        expect(result!.password).to.equal(pass)
    }

    @test "should return user 'davidthorn' and password '123456:654321' when called with 'davidthorn:123456:654321'"() {

        const user = 'davidthorn'
        const pass = '123456:654321'
        const data = Buffer.from(`${user}:${pass}`).toString('base64')
        const header = `Basic ${data}`

        const result = this.retrieveBasicAuthenticationInfo(header)
        expect(result).to.not.be.undefined
        expect(result!.user).to.not.be.undefined
        expect(result!.user).to.equal(user)
        expect(result!.password).to.not.be.undefined
        expect(result!.password).to.equal(pass)
    }

    @test "should return undefined when header is undefined"() {
        const result = this.retrieveBasicAuthenticationInfo(undefined)
        expect(result).to.be.undefined
    }

    @test "should return undefined when header is does not start with Basic"() {
        const result = this.retrieveBasicAuthenticationInfo('A Basic somedata')
        expect(result).to.be.undefined
    }

    @test "should return undefined when Basic data is davidthorn123456 " () {
        const result = this.retrieveBasicAuthenticationInfo('Basic davidthorn123456')
        expect(result).to.be.undefined
    }

    
}
