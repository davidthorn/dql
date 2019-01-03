/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { BodyDQL } from "../../src/body/BodyDQL";
import { expect } from 'chai'

@suite('BodyDQLUnitTest - shouldValidateProperty')
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

        let result = this.shouldValidateProperty(nameProperty , 'name')
        expect(result).to.be.equal(true)

        result = this.shouldValidateProperty(nameProperty , '')
        expect(result, "nameProperty , ''").to.be.equal(true)

        result = this.shouldValidateProperty(nameProperty , undefined)
        expect(result, 'nameProperty , undefined').to.be.equal(true)

        result = this.shouldValidateProperty(nameProperty , null)
        expect(result, 'nameProperty , null').to.be.equal(true)

        result = this.shouldValidateProperty(middleNameProperty , undefined)
        expect(result, 'middleNameProperty , undefined').to.be.equal(false)

        result = this.shouldValidateProperty(middleNameProperty , null)
        expect(result, 'middleNameProperty , null').to.be.equal(false)

        result = this.shouldValidateProperty(middleNameProperty , 'james')
        expect(result, "middleNameProperty , 'james'").to.be.equal(true)

        result = this.shouldValidateProperty(surnameProperty , 'thorn')
        expect(result, "surnameProperty , 'thorn'").to.be.equal(true)

        result = this.shouldValidateProperty(surnameProperty , undefined)
        expect(result).to.be.equal(false)

        result = this.shouldValidateProperty(surnameProperty , null)
        expect(result, 'surnameProperty , null').to.be.equal(false)

        result = this.shouldValidateProperty(ageProperty , 40)
        expect(result, 'ageProperty , 40' ).to.be.equal(true)

        result = this.shouldValidateProperty(ageProperty , undefined)
        expect(result, 'ageProperty , undefined').to.be.equal(false)

        result = this.shouldValidateProperty(ageProperty , null)
        expect(result, 'ageProperty , null').to.be.equal(false)
    }

}
