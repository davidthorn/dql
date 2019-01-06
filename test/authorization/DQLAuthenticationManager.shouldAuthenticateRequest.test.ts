/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import DQLAuthenticationManager from "../../src/DQLAuthenticationManager";
import { expect } from 'chai'

@suite('DQLAuthenticationManager - shouldAuthenticateRequest')
export class DQLAuthenticationManagerUnitTest extends DQLAuthenticationManager {

    @test "should return true when resourcePath is \/people\/([\\w\\d]+) and originalUrl is /people/10 "() {

        const resource = '\/people\/([\\w\\d]+)'
        const original = '/people/10'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).true
     
    }

    @test "should return false when resourcePaths backslashes are not escaped suchas \/people\/([\w\d]+) and originalUrl is /people/10 "() {
        const resource = '\/people\/([\w\d]+)'
        const original = '/people/10'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).false
    }

    @test "should return true when resourcePaths backslashes are not escaped suchas /people/([\\w\\d]+) and originalUrl is /people/10 "() {
        const resource = '/people/([\\w\\d]+)'
        const original = '/people/10'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).true
    }

    @test "should return true when resourcePaths is /people and originalUrl is /people/10 "() {
        const resource = '/people'
        const original = '/people/10'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).true
    }

    @test "should return false when resourcePaths is /people/([\\w\\d]+)/likes and originalUrl is /people/10 "() {
        const resource = '^/people/([\\w\\d]+)/likes'
        const original = '/people/10'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).false
    }

    @test "should return false when resourcePaths is ^/people/([\\w\\d]+)/likes and originalUrl is /api/people/10/likes "() {
        const resource = '^/people/([\\w\\d]+)/likes'
        const original = '/api/people/10'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).false
    }

    @test "should return true when resourcePaths is /people/([\\w\\d]+)/likes and originalUrl is /api/people/10/likes "() {
        const resource = '/people/([\\w\\d]+)/likes'
        const original = '/api/people/10/likes'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).true
    }

    @test "should return true when resourcePaths is /people/([\\w\\d]+)/likes and originalUrl is /api/people/10/likes/11 "() {
        const resource = '/people/([\\w\\d]+)/likes'
        const original = '/api/people/10/likes/11'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).true
    }

    @test "should return false when resourcePaths is /people/([\\d]+)/likes/([a-z]+) and originalUrl is /api/people/10/likes/11 "() {
        const resource = '/people/([\\d]+)/likes/([a-z]+)'
        const original = '/api/people/10/likes/11'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).false
    }

    @test "should return false when resourcePaths is /people/([\\d]+)/likes/([a-z]+) and originalUrl is /api/people/10/likes/david "() {
        const resource = '/people/([\\d]+)/likes/([a-z]+)'
        const original = '/api/people/10/likes/david'

        const result = this.shouldAuthenticateRequest(resource , original)
        expect(result).true
    }

   
}
