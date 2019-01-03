/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { BodyDQL } from "../../src/body/BodyDQL";
import { expect } from 'chai'

@suite('BodyDQLUnitTest - hasValue')
export class BodyDQLUnitTest extends BodyDQL {

    @test "validates has Value return true and false for all various values" () {
       expect(this.hasValue(1)).true
       expect(this.hasValue('')).false
       expect(this.hasValue('hello')).true
       expect(this.hasValue(undefined)).false
       expect(this.hasValue(null)).false
    }

}
