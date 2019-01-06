import { Request, Response } from 'express'
import * as path from 'path'
import * as fs from 'fs'

export default class DQLAuthenticationManager {

    authentications: DQLAuthentication[]

    constructor() {
        this.authentications = []
    }

    /**
     * Adds a DQL Authentication
     *
     * @param {DQLAuthentication} authentication
     * @memberof DQLAuthenticationManager
     */
    add(authentication: DQLAuthentication) {
        this.authentications.push(authentication)
    }

    /**
     *
     *
     * @param {Request} request
     * @param {Response} response
     * @param {() => void} next
     * @memberof DQLAuthenticationManager
     */
    public authenticate(request: Request, response: Response, next: () => void) {

        const auths = this.authentications
            .filter(i => { return this.shouldAuthenticateRequest(i.resourcePath , request.originalUrl) })
            .filter(i => { return !i.allowedMethod.includes(request.method as HttpMethod) })
            .sort((l: DQLAuthentication,r: DQLAuthentication) => {
                return l.priority > r.priority ? 1 : -1
            })

        if (auths.length > 0) {

            const auth = auths[0]
            switch (auth.scheme) {
                case 'Basic':
                    if(auth.basic !== undefined) {
                        this.handleBasic(auth, auth.basic , request, response, next)
                    } else {
                        response.status(401).send({
                            method: request.method,
                            statusCode: 500,
                            message: 'Internal Server Error (Basic Authentication information required)',
                            scheme: 'Basic'
                        })
                    }
                    
                    break;
                case 'Bearer':
                    if(response.statusCode !== 401) {
                        this.handleBear(auth, request, response, next)
                    } 
                    
                    break;
            }

        } else {
            next()
        }

    }

    public handleBear(auth: DQLAuthentication,  request: Request, response: Response, next: () => void) {
        if (request.headers.authorization === undefined) {
            response.status(401).send({
                method: request.method,
                statusCode: 401,
                message: 'Unauthorized',
                scheme: 'Bearer'
            })
        } else {
            next()
        }

    }

    retrieveBasicAuthenticationInfo(authorizationHeader?: string): { user: string , password: string } | undefined {
        
        if(authorizationHeader === undefined) return undefined

        const result = authorizationHeader.match(/Basic\s*([^\s]+)/)
        
        if(result === null) return undefined

        if(result.length !== 2) return undefined

        const data = result[1]

        if(data === undefined) return undefined

        const credentialsData = Buffer.from(data.trim(), 'base64').toString()
        const credentials = credentialsData.split(':')

        if(credentials.length < 2) return undefined
        
        return {
            user: credentials.shift()!,
            password: credentials.join(':')
        }
    }

    public handleBasic(auth: DQLAuthentication, basic: BasicAuthentication , request: Request, response: Response, next: () => void) {
        
        let authorized: boolean = false
        // const authorization = request.headers.authorization || ''
        // const result = authorization.match(/Basic\s*([^\s]+)/)
        
        // const data = result !== null && result.length === 2 ? result[1] : undefined

        // if(data !== undefined) {
        //     const credentialsData = Buffer.from(data.trim(), 'base64').toString()
        //     const credentials = credentialsData.split(':')
        //     if(credentials.length === 2) {
        //         authorized = credentials[0] === basic.user && credentials[1] === basic.password
        //     }
        // }

        const data = this.retrieveBasicAuthenticationInfo(request.headers.authorization)
        
        if(data !== undefined) {
            const { user, password } = data
            authorized = user === basic.user && password === basic.password
        } 

        switch (authorized) {
            case true:
            next()
            break;
            case false:
                response.status(401).send({
                    method: request.method,
                    statusCode: 401,
                    message: 'Unauthorized',
                    scheme: 'Basic'
                })
        }
    }

    /**
     * Returns true if the resource path matchs the original url
     * Returns false for all other cases
     *
     * @param {(RegExp | string)} resourcePath
     * @param {string} originalUrl
     * @returns {boolean}
     * @memberof DQLAuthenticationManager
     */
    shouldAuthenticateRequest(resourcePath: RegExp | string , originalUrl: string): boolean {
        const source = resourcePath instanceof RegExp ? resourcePath.source : `${resourcePath.split('/').join('\\/')}`
        const reg = new RegExp(source)
        return originalUrl.match(reg.source) !== null
    }

}