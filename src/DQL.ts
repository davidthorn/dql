

import { BodyDQLEndpoint } from '../src/body/BodyDQLEndpoint'
import e, { Response, Request } from 'express'
import { BodyDQL } from './body/BodyDQL';
import bodyParser = require('body-parser');


export class DQL {

    server: e.Express

    port?: number

    host?: string
 
    endpoints: BodyDQL

    constructor() {
        this.endpoints = new BodyDQL()
        this.server = e()
        this.server.use(this.handleNotFound.bind(this))
        this.server.use(this.handleMethodNotAllowed.bind(this))
        this.server.use(bodyParser.urlencoded({ extended: true }))
        this.server.use(bodyParser.json({

        }))
        
    }

    /**
     * This is the first middleware which will be called for all requests
     * If this method does not find a middleware with a path which matches the originalUrl of the request
     * then a 404 will be returned
     * This method does not check if the endpoint can handle the request just that their urls match
     *
     * @param {Request} request
     * @param {Response} response
     * @param {() => void} next
     * @memberof DQL
     */
    handleNotFound(request: Request , response: Response , next: () => void) {
        const endpoint = this.endpoints.getEndpoints()
        .filter(i => { return i.path === request.originalUrl }).length
        switch(endpoint > 0) {
            case true:
                next()
            break;
            case false:
            response.status(404).send({
                statusCode: 404,
                message: 'Not Found',
                path: request.originalUrl,
                method: request.method
            }) 
        }
    }

    /**
     * This method will check that their is an endpoint which can handle this originalUrl 
     * If the endpoints method property matches that of the requests then the next method will be called
     * If the methods do not match then a 405 status will be returned
     *
     * @param {Request} request
     * @param {Response} response
     * @param {() => void} next
     * @memberof DQL
     */
    handleMethodNotAllowed(request: Request , response: Response , next: () => void) {
        
        const isMethodAllowed = (request: Request , endpoint: BodyDQLEndpoint) => {
            return endpoint.method !== undefined && endpoint.method! === request.method
        }

        const endpoints = this.endpoints.getEndpoints().filter(i => { return i.path === request.originalUrl })
        
        let handled: boolean = false

        if(endpoints.length > 0) {
            handled = endpoints.filter(i => { return isMethodAllowed(request , i.endpoint) }).length > 0
        } else {
            /// this can never be 0 zero because the handleNotFound middleware should handled this
            response.status(500).send({
                statusCode: 500,
                message: 'Internal Server Error',
                path: request.originalUrl,
                method: request.method
            }) 
        }

        switch(handled) {
            case true:
            next()
            break
            default:
            response.status(405).send({
                statusCode: 405,
                message: 'Method Not Allowed',
                path: request.originalUrl,
                method: request.method
            })  

        }
    }

    add(name: string, endpoint: BodyDQLEndpoint): DQL {
        this.endpoints.add(name, endpoint)
        return this  
    } 

    

    /// This middleware will be called at the end if no other middleware has sent a request back
    /// this will send a 404 if anyone has any other recommendation please contact me to tell me what it
    /// should be
    handleNotHandledEndpoint() {
        this.server.use((req, res, next) => {

            try {
                const endpoint = this.endpoints.getEndpoint(req.originalUrl)
                if(endpoint.middleware === undefined) throw new Error()
                if(req.method !== endpoint.method) throw new Error()
                endpoint.middleware(req, res, next)
            } catch(error) {
                res.status(404).send({
                    statusCode: 404,
                    message: 'Not Found',
                    path: req.originalUrl   
                })
            }
        })
    }
 
    listen() {

        // this.handle404()
       
        this.endpoints.getEndpoints().forEach(data => {

            const defaultMw = (req: Request, res: Response, next: () => any) => {
 
                const body = req.headers["content-type"] === "application/json" ?req.body : req.body
                
                try { 
                    const errors = this.endpoints.validate({ 
                        body: body === undefined ? {} : body,
                        originalPath: req.originalUrl
                    })
     
                    if (errors.length > 0) {
                        res.status(400).send({
                            statusCode: 400,
                            message: 'Bad Request',
                            errors: errors.map(i => { return i.message }),
                            path: req.originalUrl
                        })
                    } else {
                        next() 
                    }
                } catch(error) {
                    next()
                }  
                
 
            }

            this.server.use(data.path, defaultMw)

            if (data.endpoint.middleware === undefined) return

            this.server.use(data.path, (req, res, next) => {
            
                if(data.endpoint.method === undefined){
                    return next()
                }

                if(req.method === data.endpoint.method && data.endpoint.middleware !== undefined && data.path === req.originalUrl) {
                    data.endpoint.middleware(req, res , next)
                } else {
                    next() 
                }
            })

        })  

        this.handleNotHandledEndpoint()

        this.server.listen(this.port || 3000, this.host || 'localhost', () => {  
            console.log('listening') 
        })

    }

}


export default DQL

