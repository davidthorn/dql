/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'
import { HttpMethod } from "../../src/DQLAuthentication";
import { DQLEndpointController, DQLEndpointControllerType } from "../../src/DQLEndpointController";


class Context<T extends DQLEndpointController> {

    manager: DQLEndpointManager<T>

    constructor() {
        this.manager = new DQLEndpointManager()
    }

}




@suite('DQLEndpointManager - add')
export class DQLEndpointManagerUnitTest extends DQLEndpointManager<DQLEndpointController> {

    @test "add GET method on controller" () {
       
        class LoginController extends DQLEndpointController {
            get(){}
        }

        this.add( '/login' , {
            method: 'POST',
            body: {},
            controller: new LoginController,
            resourcePath: '/login'
        } )

        expect(Object.keys(this.data).length).to.equal(1)
       
        expect(this.data[`/login|GET`]).to.not.be.undefined
        const endpoint = this.data[`/login|GET`]
        expect(endpoint.resourcePath).to.not.be.undefined
        expect(endpoint.resourcePath).to.equal('/login')
    }

    @test "add DELETE method on controller" () {
       
        class DeleteController extends DQLEndpointController {
            delete(){}
        }

        this.add( '/login' , {
            method: 'DELETE',
            body: {},
            controller: new DeleteController,
            resourcePath: '/login'
        } )

        expect(Object.keys(this.data).length).to.equal(1)
       
        expect(this.data[`/login/:id|DELETE`] , 'Login Delete to not be undefined').to.not.be.undefined
        const endpoint = this.data[`/login/:id|DELETE`]
        expect(endpoint.resourcePath).to.not.be.undefined
        expect(endpoint.resourcePath).to.equal('/login/:id')
    }

    @test "add DELETE | PATCH methodS on controller" () {
       
        class DeleteController extends DQLEndpointController {
            delete(){}
            post(){}
            patch(){}
        }

        this.add( '/login' , {
            method: 'DELETE',
            body: {},
            controller:new DeleteController,
            resourcePath: '/login'
        } )

        expect(Object.keys(this.data).length).to.equal(3)
       
        expect(this.data[`/login/:id|DELETE`]).to.not.be.undefined
        const deleteEndpoint = this.data[`/login/:id|DELETE`]
        expect(deleteEndpoint.resourcePath).to.not.be.undefined
        expect(deleteEndpoint.resourcePath).to.equal('/login/:id')

        expect(this.data[`/login/:id|PATCH`]).to.not.be.undefined
        const patchEndpoint = this.data[`/login/:id|PATCH`]
        expect(patchEndpoint.resourcePath).to.not.be.undefined
        expect(patchEndpoint.resourcePath).to.equal('/login/:id')

        expect(this.data[`/login|POST`]).to.not.be.undefined
        const postEndpoint = this.data[`/login|POST`]
        expect(postEndpoint.resourcePath).to.not.be.undefined
        expect(postEndpoint.resourcePath).to.equal('/login')
    }

  @test "adding headers middleware to controller" () {
        class G extends DQLEndpointController {
            post(){}
            headers() {}
        }

        this.add('/people' , {
            method: 'POST',
            body: {},
            resourcePath: '/people',
            controller: new G
        })

        const postEndpoint = this.data['/people|POST']
        
        expect(postEndpoint.controller).to.not.be.undefined
        expect(postEndpoint.controller!.headers).to.not.be.undefined
        expect(postEndpoint.middleware).to.not.be.undefined
        
    }

}
