/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'

@suite('DQLEndpointManager - hasValue')
export class DQLEndpointManagerUnitTest extends DQLEndpointManager {

    @test "validates has Value return true and false for all various values" () {
       expect(this.hasValue(1)).true
       expect(this.hasValue('')).false
       expect(this.hasValue('hello')).true
       expect(this.hasValue(undefined)).false
       expect(this.hasValue(null)).false
    }

}
