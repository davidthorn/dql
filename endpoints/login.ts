import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';
import { EnvironmentValidationMiddleware, ValidationMiddleware } from '../middlewares';
import { LoginErrorMessage, LoginSchema, ValidateSchema } from '../schema';
import { FirebaseAuthEnvironmentMessage, FirebaseAuthEnvironmentSchema } from '../schema/FirebaseAuthEnvironment.schema';
import { HttpMethod } from '../src/DQLAuthentication';
import { DQLEndpoint } from '../src/DQLEndpoint';
import { firebaseAuthLoginEmailPassword } from '../src/firebase-auth';
import handleFirebaseError from '../src/firebase-auth/handleFirebaseError';

const validationMethods: HttpMethod[] = [
    'POST'
]

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
    EnvironmentValidationMiddleware(login.env , FirebaseAuthEnvironmentSchema , FirebaseAuthEnvironmentMessage)(request, response, next)
}

const headers =  async function (request: Request , response: Response , next: NextFunction)  {

    const { error } = joi.object({
            "content-type" : joi.string().regex(/application\/json/).required()
        }).validate(request.headers , {
            abortEarly: false,
            allowUnknown: true
        })


    if(error === null) {
        next()
    } else {
        response.set('Accept' , 'application/json')
        response.status(400).send({
            method: request.method,
            statusCode: 400,
            errors: error,
            headers: request.headers["content-type"],
            message: 'Request required application/json'
        })
    }

}

const validation =  async function (request: Request , response: Response , next: NextFunction)  {

    const { error } = ValidateSchema(LoginSchema , request.body)

    if(error === null) {
        next()
    } else {

        let message = ''

        switch(error.details[0].type) {
            case 'string.email':
            message = 'INVALID_EMAIL'
            break
            case 'string.min':
            message = 'INVALID_PASSWORD'
            break;
            default: break
        }

        response.status(400).send({
            error: {
                message,
                code: 400,
                errors: error.details.map(i => {
                    return {
                        domain: i.context!.key!,
                        reason: i.type,
                        message: message
                    }
                })
            }
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

login.controller = {
    environment,
    headers,
    validation: ValidationMiddleware(LoginSchema, LoginErrorMessage ),
    post: middleware
}

export default {
    resourcePath: login.resourcePath,
    endpoint: login
}