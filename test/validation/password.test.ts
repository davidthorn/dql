/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>
import chai,{expect} from 'chai'
import { isString } from '../../src/PropertyValidators'

@suite('Password Type Validation')
export class PasswordTypeValidationUnitTest {

    validatePassword(value: any | undefined) {

    }

    @test "isString" () {
       
       expect(isString("a string" , []).length).to.equal(0)
       expect(isString("1" , []).length).to.equal(0)
  
       expect(isString(12345678 , []).length).to.equal(1)
  
 
    }

  
}
