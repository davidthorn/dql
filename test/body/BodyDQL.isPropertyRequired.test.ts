/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { BodyDQL } from "../../src/body/BodyDQL";
import { expect } from 'chai'

@suite('BodyDQLUnitTest - isPropertyRequired')
export class BodyDQLUnitTest extends BodyDQL {

    @test "validates if a property is required to be validated" () {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'string',
                        required: true
                    },
                    middleName: {
                        type: 'string',
                        required: false
                    },
                    surname: {
                        type: 'string'
                    },
                    age: {
                        type: 'number',
                        required: undefined
                    }
                }
            }
        }

        const endPoint = this.getEndpoint('/app')
        const nameProperty = this.getEndpointProperty(endPoint , 'name')
        const middleNameProperty = this.getEndpointProperty(endPoint , 'middleName')
        const surnameProperty = this.getEndpointProperty(endPoint , 'surname')
        const ageProperty = this.getEndpointProperty(endPoint , 'age')

        let result = this.isPropertyRequired(nameProperty)
        expect(result).to.be.equal(true)

        result = this.isPropertyRequired(nameProperty)
        expect(result, "nameProperty").to.be.equal(true)

        result = this.isPropertyRequired(middleNameProperty)
        expect(result, 'middleNameProperty').to.be.equal(false)

        result = this.isPropertyRequired(surnameProperty)
        expect(result, "surnameProperty").to.be.equal(false)

        result = this.isPropertyRequired(ageProperty)
        expect(result, 'ageProperty' ).to.be.equal(false)

    }

}
