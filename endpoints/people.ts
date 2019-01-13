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



const validation = (request: Request, res: Response, next: NextFunction) => {

    const { error  } = joi.object({
        name: joi.string().min(6).max(10).regex(/[\d]+/).required(),
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

        res.status(400).send({ errors: reduced })
    }

}

const success = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'all good'
    })
}

rootEndpoint.middleware = [
    validation,
    success
]

const personEndpoint = {
    resourcePath: rootEndpoint.resourcePath,
    endpoint: rootEndpoint
}

export default personEndpoint