import { DQLEndpoint } from './DQLEndpoint'
import e, { Response, Request } from 'express'
import { DQLEndpointManager } from './DQLEndpointManager';
import bodyParser = require('body-parser');

export class DQLServer {

    server: e.Express

    port?: number

    host?: string
 
    endpoints: DQLEndpointManager

    constructor() {
        this.endpoints = new DQLEndpointManager()
        this.server = e()
    }
        
    /**
     * This method handles static content for the endpoint
     * An endpoint should implement the options property and supply
     * add the publicDir property with the name of the folder in which the static files are located
     * 
     *
     * @param {{ path: string , endpoint: DQLEndpoint}} data
     * @memberof DQLServer
     */
    handleStaticContent(data: { path: string , endpoint: DQLEndpoint}) {

        if(data.endpoint.options === undefined ) return
        const { publicDir , rootDir  } = data.endpoint.options!

        let root = rootDir || ''
        if(publicDir === undefined) return
        root = root.length > 0 ? root.substring(root.length - 1 , root.length) === '/' ? root : `${root}/` : '' 

        this.server.use(data.path , e.static(`${root}${publicDir!}` , {
            fallthrough: false,
            extensions: [ 'html' ],
            redirect: true

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
                url: request.url,
                message: 'Not Found',
                path: request.originalUrl,
                method: request.method,
                mount: this.server.mountpath
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
        
        const isMethodAllowed = (request: Request , endpoint: DQLEndpoint) => {
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

    /**
     * Adds an endpoint to the manager with this path
     *
     * @param {string} path
     * @param {DQLEndpoint} endpoint
     * @returns {DQLServer}
     * @memberof DQLServer
     */
    add(path: string, endpoint: DQLEndpoint): DQLServer {
        this.endpoints.add(path, endpoint)
        this.handleStaticContent({path, endpoint})
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
 
    /**
     * Starts the express server to listen for all requests
     * This method will start all endpoints which have been registered prior listen being executed
     *
     * @memberof DQLServer
     */
    listen() {

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

            if(data.endpoint.options !== undefined  && data.endpoint.options.rootDir) {
                e.static(data.endpoint.options.rootDir , {
                    fallthrough: true
                })
            }

            this.server.use(data.path, defaultMw)

            if (data.endpoint.middleware === undefined) return

            this.server.use(data.path, (req, res, next) => {
            
                if(req.method === data.endpoint.method && data.endpoint.middleware !== undefined && data.path === req.originalUrl) {
                    data.endpoint.middleware(req, res , next)
                } else {
                    next() 
                }
            })

        })  

        this.server.use(this.handleNotFound.bind(this))
        this.server.use(this.handleMethodNotAllowed.bind(this))
        this.server.use(bodyParser.urlencoded({ extended: true }))
        this.server.use(bodyParser.json({}))

        this.server.listen(this.port || 3000, this.host || 'localhost', () => {  
            console.log('listening') 
        })



    }

    handleStatusCode(chunk: any, encoding?: string, cb?: () => void): void {

    }

}


export default DQLServer

