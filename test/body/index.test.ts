/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { BodyDQL } from "../../src/body";
import { expect } from 'chai'

@suite('BodyDQLUnitTest')
export class BodyDQLUnitTest extends BodyDQL {

    @test "loadFile returns an object" () {
        const data = this.loadFile()
        expect(data).to.not.be.undefined
        expect(data["/app"]).to.not.be.undefined
    }

    @test "this.data has been set after calling loadFile" () {
        const data = this.loadFile()
        expect(data).to.not.be.undefined
        expect(data["/app"]).to.not.be.undefined
        expect(this.data).to.equal(data)
    }

}
