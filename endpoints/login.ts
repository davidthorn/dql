import {Response , Request} from 'express'
import { DQLEndpoint } from '../src/DQLEndpoint'
import { firebaseAuthLoginEmailPassword } from '../src/firebase-auth'
import { NextFunction } from 'connect';
import * as joi from 'joi'
import handleFirebaseError from '../src/firebase-auth/handleFirebaseError';

const login: DQLEndpoint = {

    resourcePath: '/login',
    body : {},
    method: 'POST',
    middleware: [],
    env: {
        API_KEY: undefined,
        FIREBASE_HOST: undefined,
        FIREBASE_PORT: undefined
    }

}

/**
 * Validates that the FIREBASE_PORT, FIREBASE_HOST, API_KEY environment variables have been set
 * and that they are valid to make a request with
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
const environment =  async function (request: Request , response: Response , next: NextFunction)  {

    const { error } = joi.object({
        API_KEY: joi.string().required(),
        FIREBASE_HOST: joi.string().required(),
        FIREBASE_PORT: joi.string().allow('').optional()
    }).validate(login.env , {
        abortEarly: false
    })

    if(error === null) {
        next()
    } else {
        response.status(500).send({
            method: request.method,
            statusCode: 500,
            errors: error
        })
    }

}

const validation =  async function (request: Request , response: Response , next: NextFunction)  {

    const { error } = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    }).validate(request.body , {
        abortEarly: false
    })

    if(error === null) {
        next()
    } else {
        response.status(400).send({
            method: request.method,
            statusCode: 400,
            errors: error
        })
    }

}


/**
 *  Execute the firebaseAuthLoginEmailPassword command to attempt to sign the user in  with email and password
 *
 * @param {Request} request
 * @param {Response} response
 */
const middleware = async function (request: Request, response: Response) {

    const result = await firebaseAuthLoginEmailPassword({
        credentials: {
            email: request.body.email, 
            password: request.body.password
        },
        returnSecureToken: true,
        API_KEY: login.env!.API_KEY!
    }).catch((responseError: any) => {
        const error = handleFirebaseError(responseError)
        response.status(error.error.code).send(error)
    })

    response.status(200).send(result)

}

login.middleware = [
    environment,
    validation,
    middleware
]

export default {
    resourcePath: login.resourcePath,
    endpoint: login
}