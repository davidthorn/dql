import joi from 'joi';
import { DQLErrorMessage } from './index';

export function mapValidationError(message: string, error: joi.ValidationError): DQLErrorMessage {
    return {
        error: {
            message,
            code: 400,
            errors: error.details.map(i => {
                return {
                    domain: i.context!.key!,
                    reason: i.type,
                    message: i.message
                };
            })
        }
    };
}
