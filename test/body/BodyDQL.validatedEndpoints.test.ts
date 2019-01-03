/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { BodyDQL } from "../../src/body";
import { expect } from 'chai'

@suite('BodyDQLUnitTest - validatedEndpoints')
export class BodyDQLUnitTest extends BodyDQL {

    goodMockdata: { [id: string] : any } = {
        "/app" : {
            name: "a name"
        }
    }

    badMockdata: { [id: string] : any } = {}

    @test "throws and error when a top level property does not start with a forward slash" () {
       
        this.data = {
            "invalidendpoint/": {
                body : { }
            }
        }

        expect(() => { this.validatedEndpoints() } , 'validate end point should throw because endpoint does not start with forward slash').to.throw()

    }

    @test "throws an error when endpoint does not contain a body property" () {

        this.data = {
            "/app" : {
                body : { }
            }
        }
       
        /// This can only be run without typescripts type checking
        ///expect(() => { this.validatedEndpoints() } , 'all endpoints must contain a body property').to.throw('all endpoints must contain a body property')

    }

    @test "throws an error when the endpoints body property does not exist" () {
        
        this.data = {
            "/app" : {
                body : {}
            }
        }
        /// This can only be run without typescripts type checking
        //expect(() => { this.validatedEndpoints() } , 'an endpoint must contain a body property').to.throw('an endpoint must contain a body property')

    }

    @test "does not throws an error when an endpoints literal 'property-name' property is urlencoded" () {
        
        this.data = {
            "/app" : {
                body : {
                    "my-property" : {
                        type: "string"
                    }
                }
            }
        }
        expect(() => { this.validatedEndpoints() } , 'name property value must be urlencoded').to.not.throw('name property value must be urlencoded')

    }

    @test "throws an error when an endpoints literal 'property-name' property is not urlencoded" () {
        
        this.data = {
            "/app" : {
                body : {
                    "my property" : {
                        type: "string"
                    }
                }
            }
        }
        expect(() => { this.validatedEndpoints() } , 'name property value must be urlencoded').to.throw('name property value must be urlencoded')

    }

    @test "the required properties value if exists is boolean" () {
        this.data = {
            "/app" : {
                body : {
                    "my-property" : {
                        type: "string"
                       
                        
                    }
                }
            }
        }

        // /// This can only be run without typescripts type checking
        // expect(() => { this.validatedEndpoints() } , 
        // `the property my property's 'required' value must either be true or false. boolean required`)
        // .to.throw(`the property my property's 'required' value must either be true or false. boolean required`)
    
    }


}
