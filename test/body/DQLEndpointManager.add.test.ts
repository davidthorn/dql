/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'
import { HttpMethod } from "../../src/DQLAuthentication";

@suite('DQLEndpointManager - add')
export class DQLEndpointManagerUnitTest extends DQLEndpointManager {

    @test "add GET method on controller" () {
       
        this.add( '/login' , {
            method: 'POST',
            body: {},
            controller: {
                get: () => { },
                handlesMethod(method: HttpMethod) {
                    return true
                }
            },
            resourcePath: '/login'
        } )

        expect(Object.keys(this.data).length).to.equal(1)
       
        expect(this.data[`/login|GET`]).to.not.be.undefined
        const endpoint = this.data[`/login|GET`]
        console.log(endpoint)
        expect(endpoint.resourcePath).to.not.be.undefined
        expect(endpoint.resourcePath).to.equal('/login')
    }

    @test "add DELETE method on controller" () {
       
        this.add( '/login' , {
            method: 'DELETE',
            body: {},
            controller: {
                delete: () => { },
                handlesMethod(method: HttpMethod) {
                    return true
                }
            },
            resourcePath: '/login'
        } )

        expect(Object.keys(this.data).length).to.equal(1)
       
        expect(this.data[`/login|DELETE`]).to.not.be.undefined
        const endpoint = this.data[`/login|DELETE`]
        console.log(endpoint)
        expect(endpoint.resourcePath).to.not.be.undefined
        expect(endpoint.resourcePath).to.equal('/login/:id')
    }

    @test "add DELETE | PATCH methodS on controller" () {
       
        this.add( '/login' , {
            method: 'DELETE',
            body: {},
            controller: {
                post: () => { },
                delete: () => { },
                patch: () => { },
                handlesMethod(method: HttpMethod) {
                    return true
                }
            },
            resourcePath: '/login'
        } )

        expect(Object.keys(this.data).length).to.equal(3)
       
        expect(this.data[`/login|DELETE`]).to.not.be.undefined
        const deleteEndpoint = this.data[`/login|DELETE`]
        console.log(deleteEndpoint) 
        expect(deleteEndpoint.resourcePath).to.not.be.undefined
        expect(deleteEndpoint.resourcePath).to.equal('/login/:id')

        expect(this.data[`/login|PATCH`]).to.not.be.undefined
        const patchEndpoint = this.data[`/login|PATCH`]
        console.log(patchEndpoint)
        expect(patchEndpoint.resourcePath).to.not.be.undefined
        expect(patchEndpoint.resourcePath).to.equal('/login/:id')

        expect(this.data[`/login|POST`]).to.not.be.undefined
        const postEndpoint = this.data[`/login|POST`]
        console.log(postEndpoint)
        expect(postEndpoint.resourcePath).to.not.be.undefined
        expect(postEndpoint.resourcePath).to.equal('/login')
    }

}
