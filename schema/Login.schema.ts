import joi from 'joi'
import { DQLErrorMessage } from './index'
import { mapValidationError } from './mapValidationError';

const LoginSchema: joi.ObjectSchema = joi.object({
    email: joi.string().email().required().label('Email Address'),
    password: joi.string().min(6).max(30).required().label('Password')
})

const LoginErrorMessage = (error: joi.ValidationError): DQLErrorMessage => {
    let message = ''

    switch (error.details[0].type) {
        case 'string.email':
            message = 'INVALID_EMAIL'
            break
        case 'string.min':
            message = 'INVALID_PASSWORD'
            break;
        default: break
    }

    return mapValidationError(message, error)
}

export { LoginSchema, LoginErrorMessage }


