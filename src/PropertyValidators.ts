import isboolean from 'lodash.isboolean';
import isnumber from 'lodash.isnumber';
import isstring from 'lodash.isstring'

export function isNumber(parsedValue: any, errors: Error[]): Error[] {
    if (!isnumber(parsedValue)) {
        errors.push(new Error('value is not a number'));
    }
    return errors;
}

export function isBoolean(parsedValue: any, errors: Error[]): Error[] {
    if (!isboolean(parsedValue)) {
        errors.push(new Error('value is not boolean'));
    }
    return errors;
}

export function isString(parsedValue: any, errors: Error[]): Error[] {
    if (isboolean(parsedValue)) {
        errors.push(new Error('value is boolean and not a string'));
    }
    if (!isstring(parsedValue)) {
        errors.push(new Error('value is not a string'));
    }

    return errors
}  