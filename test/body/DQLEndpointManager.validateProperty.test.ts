/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'

@suite('DQLEndpointManager - validateProperty')
export class DQLEndpointManagerUnitTest extends DQLEndpointManager {

    @test "returns the correct number of errors message when invalid data provided"() {

        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'string',
                        required: true,
                        errors: {
                            type: [ "You are an idiot" ]
                        }
                    },
                    surname: {
                        type: 'boolean'
                    },
                    isOld: {
                        type: 'boolean'
                    },
                    age: {
                        type: 'number'
                    }
                }
            }
        }

        const request = {
            originalPath: '/app',
            body: {
                name: 'david',
                isOld: 1 
            }
        }

        const endpoint = this.getEndpoint('/app')
        const nameErrors = this.validateProperty({
            property: this.getEndpointProperty(endpoint , 'name'),
            value: request.body.name
        })
        expect(nameErrors.length).to.equal(0)

        const isOldErrors = this.validateProperty({
            property: this.getEndpointProperty(endpoint , 'isOld'),
            value: request.body.isOld
        })

        expect(isOldErrors.length).to.equal(1)

        const l = this.validate({
            originalPath: request.originalPath,
            body: request.body
        })

        expect(l.length).to.equal(1)
    }

   
}
