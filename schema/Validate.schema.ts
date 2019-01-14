import Joi, { ObjectSchema, ValidationResult } from "joi";

const ValidateSchema = function<T>(schema: Joi.ObjectSchema , value: any): ValidationResult<T> {
    return schema.validate(value , {
        abortEarly: false
    })
}

export { ValidateSchema }