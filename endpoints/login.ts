import {Response , Request} from 'express'
import { DQLEndpoint } from '../src/DQLEndpoint'
import { firebaseAuthLoginEmailPassword } from '../src/firebase-auth'

const login: DQLEndpoint = {

    resourcePath: '/login',
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
    middleware: async function (request: Request, response: Response) {
        
        if(this.env === undefined) {
            response.status(500).send({
                method: request.method,
                statusCode: 500,
                message: 'API_KEY not set in env'
            })
            return
        }

        if(this.env.API_KEY === undefined) {
            response.status(500).send({
                method: request.method,
                statusCode: 500,
                message: 'API_KEY not set in env'
            })
            return
        }

        const result = await firebaseAuthLoginEmailPassword({
            credentials: {
                email: request.body.email, 
                password: request.body.password
            },
            returnSecureToken: true,
            API_KEY: this.env.API_KEY
        }).catch(error => {
            response.status(error.error.code).send(error)
        })

        response.status(200).send(result)

    },
    env: {
        API_KEY: undefined
    }

}

export default {
    resourcePath: login.resourcePath,
    endpoint: login
}