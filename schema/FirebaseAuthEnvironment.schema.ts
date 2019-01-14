import Joi from 'joi'
import { DQLErrorMessage } from './ErrorMessage';
import { mapValidationError } from './mapValidationError';

const FirebaseAuthEnvironmentSchema = Joi.object({
    API_KEY: Joi.string().required(),
    FIREBASE_HOST: Joi.string().required(),
    FIREBASE_PORT: Joi.string().allow('').optional()
})

const FirebaseAuthEnvironmentMessage = (error: Joi.ValidationError): DQLErrorMessage => {
    let message = error.details[0].type

    switch (error.details[0].type) {
        case 'string.API_KEY':
            message = 'API_KEY_REQUIRED'
            break
        case 'string.min':
            message = 'INVALID_PASSWORD'
            break;
        case 'string.min':
            message = 'INVALID_PASSWORD'
            break;
        default: break
    }

    return mapValidationError(message, error)
}

export { FirebaseAuthEnvironmentSchema, FirebaseAuthEnvironmentMessage }