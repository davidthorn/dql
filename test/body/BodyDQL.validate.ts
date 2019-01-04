/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { BodyDQL } from "../../src/body/BodyDQL";
import { expect } from 'chai'

@suite('BodyDQLUnitTest - validate Request Body')
export class BodyDQLUnitTest extends BodyDQL {

    @test "validate throws an error when name property does not exist and required is true"() {

        this.data = {
            "/app": {
                body: {
                    name: {
                        type: Boolean,
                        required: true

                    }
                }
            }
        }

        const request = {
            originalPath: '/app',
            body: {
                "not-name": "test",

            }
        }

        expect(this.validate(request).length).to.be.greaterThan(0)
    }

    @test "validate does not throw an error when name property does not exist and required is true"() {

        this.data = {
            "/app": {
                body: {
                    name: {
                        type: Boolean,
                        required: true

                    }
                }
            }
        }

        const request = {
            originalPath: '/app',
            body: {
                "name": "test",

            }
        }

        //expect(() => { this.validate(request) }).to.not.throw()
        expect(this.validate(request).length).to.be.equal(0)

    }

    @test "validate throws an error when the type is boolean and value is not a classified boolean primitive" () {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'boolean',
                        required: true

                    }
                }
            }
        } 

        const request = {
            originalPath: '/app',
            body: {
                "name": "true",

            }
        }

        expect(this.validate(request).length).to.be.greaterThan(0)

        const request1 = {
            originalPath: '/app',
            body: {
                "name": "false",

            }
        }

        expect(this.validate(request).length).to.be.greaterThan(0)
    }

    @test "validate throws an error when the type is number and value is not a classified number primitive" () {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'number',
                        required: true

                    }
                }
            }
        } 

        const request = {
            originalPath: '/app',
            body: {
                "name": "1",

            }
        }

        expect(this.validate(request).length).to.be.greaterThan(0)

        const request1 = {
            originalPath: '/app',
            body: {
                "name": 1,

            }
        }

        expect(this.validate(request1).length).to.be.equal(0)
    }

    @test "validate throws an error when the properties value type does not match the endpoints property type" () {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'boolean',
                        required: true

                    }
                }
            }
        } 

        const request = {
            originalPath: '/app',
            body: {
                "name": "true",

            }
        }

        expect(this.validate(request).length).to.be.greaterThan(0)
    }

    @test "properties in body which are not in defined in BodyQLEndpoint or ignored" () {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'boolean',
                        required: false

                    }
                }
            }
        } 

        const request = {
            originalPath: '/app',
            body: {
                "surame": "david",
                name : true
            }
        }

        expect(this.validate(request).length).to.be.equal(0)
    }

    @test "the properties value is validated even if it is not required" () {

        this.data = {
            "/app": {
                body: {
                    isOld: {
                        type: 'boolean',
                        required: false

                    }
                }
            }
        } 

        const request = {
            originalPath: '/app',
            body: {
                isOld: false
            }
        }

        expect(this.validate(request).length).to.be.equal(0)

        this.data = {
            "/app": {
                body: {
                    isOld: {
                        type: 'boolean',
                        required: false
                    }
                }
            }
        } 

        const request1 = {
            originalPath: '/app',
            body: {
                isOld: "no"
            }
        }

        expect(this.validate(request).length).to.be.equal(0)

    } 

}
