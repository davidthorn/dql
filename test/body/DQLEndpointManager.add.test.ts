/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
import { DQLEndpointManager } from "../../src/DQLEndpointManager";
import { expect } from 'chai'
import { HttpMethod } from "../../src/DQLAuthentication";
import { DQLEndpointController, DQLEndpointControllerType } from "../../src/DQLEndpointController";

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
        expect(deleteEndpoint.resourcePath).to.not.be.undefined
        expect(deleteEndpoint.resourcePath).to.equal('/login/:id')

        expect(this.data[`/login|PATCH`]).to.not.be.undefined
        const patchEndpoint = this.data[`/login|PATCH`]
        expect(patchEndpoint.resourcePath).to.not.be.undefined
        expect(patchEndpoint.resourcePath).to.equal('/login/:id')

        expect(this.data[`/login|POST`]).to.not.be.undefined
        const postEndpoint = this.data[`/login|POST`]
        expect(postEndpoint.resourcePath).to.not.be.undefined
        expect(postEndpoint.resourcePath).to.equal('/login')
    }

    @test "get controller prototype" () {

        class G extends DQLEndpointController {
            get(){}
            post(){}
        }

        const objectController: DQLEndpointController = {
            get: () => {},
            post: () => {}
        } 

        const interfaceController: DQLEndpointControllerType = {
            get: () => {},
            post: () => {}
        } 

        const G_prototype = this.getControllerPrototype(G)
        const objectController_prototype = this.getControllerPrototype(objectController)
        const interfaceController_prototype = this.getControllerPrototype(interfaceController)

        expect(G_prototype['get']).to.not.be.undefined
        expect(G_prototype['post']).to.not.be.undefined

        expect(objectController_prototype['get']).to.not.be.undefined
        expect(objectController_prototype['post']).to.not.be.undefined

        expect(interfaceController_prototype['get']).to.not.be.undefined
        expect(interfaceController_prototype['post']).to.not.be.undefined

        const { get , post  } = interfaceController_prototype
        expect(get).to.not.be.undefined

    }

    @test "get Controller keys with typeof object" () {

        class G extends DQLEndpointController {
            get(){}
            post(){}
            validation() {}
        }

        const objectController: DQLEndpointController = {
            get: () => {},
            post: () => {}
        } 

        const interfaceController: DQLEndpointControllerType = {
            get: () => {},
            post: () => {}
        } 
        
        expect(Object.getOwnPropertyNames(G.prototype).length).to.equal(4)
        expect(Object.getOwnPropertyNames(G.prototype).includes('get')).true
        expect(Object.getOwnPropertyNames(G.prototype).includes('post')).true
        expect(Object.getOwnPropertyNames(G.prototype).includes('constructor')).true

        expect(Object.keys(objectController).length).to.equal(2)
        expect(Object.keys(objectController).includes('get')).true
        expect(Object.keys(objectController).includes('post')).true
        expect(Object.keys(objectController).includes('constructor')).false

        expect(this.getControllerKeys(G).length).to.equal(4)
        expect(this.getControllerKeys(G).includes('get') , 'should include get').true
        expect(this.getControllerKeys(G).includes('post') , 'should include post').true
        expect(this.getControllerKeys(G).includes('constructor') , 'should include constructor').true
        expect(this.getControllerKeys(G).includes('validation') , 'should include validation').true

        expect(this.getControllerKeys(objectController).length).to.equal(2)
        expect(this.getControllerKeys(objectController).includes('get') , 'should include get').true
        expect(this.getControllerKeys(objectController).includes('post') , 'should include post').true
        expect(this.getControllerKeys(objectController).includes('constructor') , 'should not include constructor').false

        expect(this.getControllerKeys(interfaceController).length).to.equal(2)
        expect(this.getControllerKeys(interfaceController).includes('get') , 'should include get').true
        expect(this.getControllerKeys(interfaceController).includes('post') , 'should include post').true
        expect(this.getControllerKeys(interfaceController).includes('constructor') , 'should not include constructor').false

        expect(this.getControllerKeys(new G).length).to.equal(4)
        expect(this.getControllerKeys(new G).includes('get') , 'should include get').true
        expect(this.getControllerKeys(new G).includes('post') , 'should include post').true
        expect(this.getControllerKeys(new G).includes('constructor') , 'should include constructor').true
        expect(this.getControllerKeys(new G).includes('validation') , 'should include validation').true

       expect(G.prototype['get']).to.not.be.undefined

        this.add('/people' , {
            method: 'POST',
            body: {},
            resourcePath: '/people',
            controller: G
        })
        
        expect(Object.keys(this.data).length).to.equal(2)
      
        const postEndpoint = this.data['/people|POST']
        const getEndpoint = this.data['/people|GET']
        
        expect(postEndpoint.controller).to.not.be.undefined
        expect(postEndpoint.controller!.validation).to.not.be.undefined
        expect(postEndpoint.middleware).to.not.be.undefined
        expect(getEndpoint.middleware).to.not.be.undefined

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
            controller: G
        })

        const postEndpoint = this.data['/people|POST']
        
        expect(postEndpoint.controller).to.not.be.undefined
        expect(postEndpoint.controller!.headers).to.not.be.undefined
        expect(postEndpoint.middleware).to.not.be.undefined
        
    }

}
