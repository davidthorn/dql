/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'
import { DQLEndpointController } from "../../src/DQLEndpointController";

@suite('DQLEndpointManager')
export class DQLEndpointManagerUnitTest extends DQLEndpointManager<DQLEndpointController> {

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
