import * as joi from 'joi'
import AuthEmailLoginError from './AuthEmailLoginError'

const defaultError: AuthEmailLoginError = {
    error: {
        errors: [
            {
                domain: "dql",
                reason: 'invalid',
                message: "an error has occurred 1"
            }
        ],
        code: 400,
        message: "an error has occurred 1"

    }
}

/**
 * Validates that the error response is a AuthEmailLoginError
 *
 * @param {*} errorResponse
 * @returns {AuthEmailLoginError}
 */
const handleFirebaseError = (errorResponse: any): AuthEmailLoginError => {

    const options: joi.ValidationOptions = {
        abortEarly: false
    }

    const schema = {
        error: joi.object({
            errors: joi.array().items({
                domain: joi.string().default('dql'),
                reason: joi.string().default('invalid'),
                message: joi.string().default('an error has occurred')
            }),
            code: joi.number().default(400),
            message: joi.string().default('an error has occurred')

        })
    }

    const { value, error } = joi.object(schema).validate(errorResponse, options)

    if (error === null) {
        return value
    } else {
        return defaultError
    }
}

export default handleFirebaseError