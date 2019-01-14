import { DQLEndpoint } from './DQLEndpoint'
import { DQLEndpointController } from './DQLEndpointController';
import { RequestHandler } from 'express';
import { HttpMethod } from './DQLAuthentication';

export class DQLEndpointControllerManager {

    endpoint:DQLEndpoint

    controller: DQLEndpointController

    constructor(endpoint: DQLEndpoint) {
        this.endpoint = endpoint
        if(this.endpoint.controller === undefined) throw new Error('The controller property of the endpoint must be set')
        this.controller = this.endpoint.controller
    }

    handle(): DQLEndpoint[] {

        const methods: string[] = [ 'POST' , 'PUT' , 'PATCH' , 'GET' , 'DELETE' ]

        const endpoints: DQLEndpoint[] = Object.keys(this.controller)
                            .filter(i => { return i !== undefined && typeof this.controller[i] === 'function' })
                            .filter(i => {
                                return methods.includes(i.toUpperCase())
                            })
                            .map((i): DQLEndpoint => {
                                return {
                                    ...this.endpoint,
                                    method: i.toUpperCase()  as HttpMethod,
                                    middleware: this.controller[i]   
                                }
                            })

        return endpoints

      

    }
   
} 