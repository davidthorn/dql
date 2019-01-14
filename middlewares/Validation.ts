import Joi from "joi";
import { RequestHandler, NextFunction, Request , Response } from "express";
import { ValidateSchema } from '../schema'

const ValidationMiddleware = function(schema: Joi.ObjectSchema , map?: (error: Joi.ValidationError) => any): RequestHandler  {

    return (request: Request , response: Response , next: NextFunction): void  => {
        const { error } = ValidateSchema(schema , request.body)
        if(error === null) {
            next()
        } else {
            response.status(422).send(map === undefined ? error : map(error))
        }
    }
}

const EnvironmentValidationMiddleware = function(env: any , schema: Joi.ObjectSchema , map?: (error: Joi.ValidationError) => any): RequestHandler  {

    return (request: Request , response: Response , next: NextFunction): void  => {
        const { error } = ValidateSchema(schema , env)
        if(error === null) {
            next()
        } else {
            response.status(422).send(map === undefined ? error : map(error))
        }
    }
}

export { ValidationMiddleware,EnvironmentValidationMiddleware }