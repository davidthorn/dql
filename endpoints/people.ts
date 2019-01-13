import { DQLEndpoint } from '../src/DQLEndpoint';
import { Request , Response } from 'express'

import * as joi from 'joi'
const Extensions = require('joi-date-extensions')

joi.extend(Extensions)

import { NextFunction } from 'connect';

const rootEndpoint: DQLEndpoint = {
    body: {},
    middleware: [],
    method: 'REST',
    resourcePath: '/people'
}

const deleteMethod =  (request: Request, response: Response, next: NextFunction): any => {
    if(request.method !== 'DELETE') {
        return next()
    }

    response.status(200).send({
        message: "deleted"
    })
}

const getMethod =  (request: Request, response: Response, next: NextFunction): any => {
    if(request.method !== 'GET') {
        return next()
    }

    response.status(200).send({
        message: "get all"
    })
}

const postMethod =  (request: Request, response: Response, next: NextFunction): any => {
    if(request.method !== 'POST') {
        return next()
    }

    response.status(201).send({
        message: "post one"
    })
}

const patchMethod =  (request: Request, response: Response, next: NextFunction): any => {
    if(request.method !== 'PATCH') {
        return next()
    }
 
    response.status(200).send({
        message: "patched one"
    })
}

const putMethod =  (request: Request, response: Response, next: NextFunction): any => {
    if(request.method !== 'PUT') { 
        return next()
    }

    response.status(200).send({
        message: "put one"
    })
}


const validation = (request: Request, response: Response, next: NextFunction): any => {

    const { error  } = joi.object({
        name: joi.string().required(),
        surname: joi.string().required(),
        age: joi.number().integer().required(),
        dob:  joi.string().regex(/^[\d]{2,4}[-\.]{1}[\d]{2,4}[-\.]{1}[\d]{2,4}$/).required()
    }).validate(request.body , {
        abortEarly: false
    })

    if(error == null) {
        return next()
    } else {

        const main = error.details
        const o: { [key:string] : any } = {}
        
        const reduced = main.reduce((c: { [key:string] : any }, o: joi.ValidationErrorItem): { [key:string] : any } => {
            if(c[o.context!.key!] === undefined) {
                c[o.context!.key!] = []
            }

            c[o.context!.key!].push(o.message)

            return c
        }, o)

        response.status(400).send({ errors: reduced })
    }

}

const success = (req: Request, response: Response) => {
    response.status(200).send({
        message: 'all good'
    })
}

rootEndpoint.middleware = [
    getMethod,
    deleteMethod,
    validation,
    postMethod,
    putMethod,
    patchMethod
]

const personEndpoint = {
    resourcePath: rootEndpoint.resourcePath,
    endpoint: rootEndpoint
}

export default personEndpoint