import Joi from "joi";
import { RequestHandler, NextFunction, Request , Response } from "express";
import { ValidateSchema } from '../schema'

const ValidationMiddleware = function<T>(schema: Joi.ObjectSchema): RequestHandler  {

    return (request: Request , response: Response , next: NextFunction): void  => {
        const { error } = ValidateSchema(schema , request.body)
        if(error === null) {
            next()
        } else {
            response.status(422).send(error)
        }
    }
}

export { ValidationMiddleware }