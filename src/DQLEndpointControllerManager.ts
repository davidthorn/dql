import { DQLEndpoint } from './DQLEndpoint'
import DQLEndpointController from './DQLEndpointController';
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

        // if (middleware !== undefined && controller === undefined) {

        //     endpoints.forEach(mw => {
        //         switch (method) {
        //             case 'GET':
        //                 this.server.get(resourcePath, mw.bind(data.endpoint))
        //                 break;
        //             case 'DELETE':
        //                 this.server.delete(resourcePath, this.handleValidation.bind(this))
        //                 this.server.delete(resourcePath, mw.bind(data.endpoint))
        //                 break;
        //             case 'PATCH':
        //                 this.server.patch(resourcePath, this.handleValidation.bind(this))
        //                 this.server.patch(resourcePath, mw.bind(data.endpoint))
        //                 break;
        //             case 'PUT':
        //                 this.server.put(resourcePath, this.handleValidation.bind(this))
        //                 this.server.put(resourcePath, mw.bind(data.endpoint))
        //                 break;
        //             case 'POST':
        //                 this.server.post(resourcePath, this.handleValidation.bind(this))
        //                 this.server.post(resourcePath, mw.bind(data.endpoint))
        //                 break
        //             case 'HEAD':
        //                 this.server.head(resourcePath, mw.bind(data.endpoint))
        //                 break;
        //         }
        //     })

        // }

        // return this.endpoint

    }
   

} 