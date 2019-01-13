import {Response , Request} from 'express'
import { DQLEndpoint } from '../src/DQLEndpoint'
import { firebaseSignupEmailPassword } from '../src/firebase-auth'
import { NextFunction } from 'connect';

const register: DQLEndpoint = {

    resourcePath: '/register',
    body : {
        email: {
            required: true,
            type: 'string'
        },
        password: {
            type: 'string',
            required: true
        }
    },
    method: 'POST',
    middleware: [],
    env: {
        API_KEY: undefined
    }

}

/**
 * Validates that the API_KEY is set
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
const validateEnvironment = async function (request: Request, response: Response, next: NextFunction)  {
        
    if(register.env === undefined) {
        response.status(500).send({
            method: request.method,
            statusCode: 500,
            message: 'API_KEY not set in env'
        })
        return
    }

    if(register.env.API_KEY === undefined) {
        response.status(500).send({
            method: request.method,
            statusCode: 500,
            message: 'API_KEY not set in env'
        })
        return
    }

    next()

}

const middleware = async function (request: Request, response: Response, next: NextFunction)  {
        
    const result = await firebaseSignupEmailPassword({
        credentials: {
            email: request.body.email, 
            password: request.body.password
        },
        returnSecureToken: true,
        API_KEY: register.env!.API_KEY!
    }).catch(error => {
        response.status(error.error.code).send(error)
    })

    response.status(200).send(result)

}

register.middleware = [
    validateEnvironment,
    middleware
]

export default {
    resourcePath: register.resourcePath,
    endpoint: register
}