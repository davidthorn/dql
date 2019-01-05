/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'

@suite('DQLEndpointManager - validateEndpointTypesMatch')
export class DQLEndpointManagerUnitTest extends DQLEndpointManager {

    @test "returns custom array of errors for property isOld when the type of the value does not match the types specification"() {
        this.data = {
            "/app": {
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
        let errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld') , true)
        expect(errors.length).to.equal(0)
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld') , false)
        expect(errors.length).to.equal(0)
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld') , 1)
        expect(errors.length).to.equal(1)
        expect(errors[0].message).to.equal('the isOld property must be either true or false')

        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld') , 'true')
        expect(errors.length).to.equal(1)
       
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld') , 'false')
        expect(errors.length).to.equal(1)

        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld') , 1)
        expect(errors.length).to.equal(1)

        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld') , 0)
        expect(errors.length).to.equal(1)

        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint , 'isOld'), 'boolean')
        expect(errors.length).to.equal(1)
        
    }

}
