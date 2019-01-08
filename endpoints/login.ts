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
    middleware: async (request: Request, response: Response) => {
        
        const result = await firebaseAuthLoginEmailPassword({
            credentials: {
                email: request.body.email, 
                password: request.body.password
            },
            returnSecureToken: true
        }).catch(error => {
            response.status(error.error.code).send(error)
        })

        response.status(200).send(result)

    }

}

export default {
    resourcePath: login.resourcePath,
    endpoint: login
}