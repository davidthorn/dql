import joi from 'joi'
import { DQLErrorMessage } from './index'

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

    return {
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
    }
}


export { LoginSchema, LoginErrorMessage }