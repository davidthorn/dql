/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'

@suite('DQLEndpointManager - getErrorsForProperty')
export class DQLEndpointManagerUnitTest extends DQLEndpointManager {

   @test "returns array of errors for property name when errors property exists" () {
    this.data = {
        "/app": {
            method: 'POST',
            body: {
                isOld: {
                    type: 'boolean',
                    required: false,
                    errors: {
                        type: [
                            'the isOld property must be either true or false'
                        ],
                        required: [
                            'The isOld property is required'
                        ]
                    }

                }
            }
        }
    } 

    const endPoint = this.getEndpoint('/app')
    const typeErrors = this.getErrorsForProperty('type' , this.getEndpointProperty(endPoint , 'isOld'))
    expect(typeErrors.length).equal(1)
    expect(typeErrors[0].message).to.equal('the isOld property must be either true or false')
    const requiredErrors = this.getErrorsForProperty('required' , this.getEndpointProperty(endPoint , 'isOld'))
    expect(requiredErrors.length).equal(1)
    expect(requiredErrors[0].message).to.equal('The isOld property is required')
   }
}
