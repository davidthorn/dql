"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_isboolean_1 = __importDefault(require("lodash.isboolean"));
const lodash_isnumber_1 = __importDefault(require("lodash.isnumber"));
class BodyDQL {
    constructor() {
        this.data = {};
    }
    loadFile() {
        this.data = {
            "/app": {
                body: {
                    propertyName: {
                        type: Boolean
                    }
                }
            }
        };
        return this.data;
    }
    getEndpoint(key) {
        if (this.data[key] === undefined) {
            throw new Error(`endpoint with key ${key} does not exist`);
        }
        return this.data[key];
    }
    getEndpointProperties(endpoint) {
        return Object.keys(endpoint.body).map(k => { return endpoint.body[k]; });
    }
    getEndpointProperty(endPoint, propname) {
        if (endPoint.body[propname] === undefined) {
            throw new Error(`endpoint property with key ${propname} does not exist`);
        }
        return endPoint.body[propname];
    }
    /**
     * Validates all endpoints
     * This method will throw an error if it finds any issue with any of the endpoints
     *
     * @memberof BodyDQL
     */
    validatedEndpoints() {
        Object.keys(this.data).forEach(endPoint => {
            const d = endPoint.match(/^\/([\w\d\-]+)/);
            if (d === null) {
                throw new Error('all endpoints must start with a forwardslash');
            }
            const endPointData = this.data[endPoint];
            if (endPointData.body === undefined || endPointData.body === null) {
                throw new Error('all endpoints must contain a body property');
            }
            /// validate all body properties literal names are urlencoded
            Object.keys(endPointData.body).forEach(prop => {
                if (encodeURI(prop) !== prop) {
                    throw new Error('name property value must be urlencoded');
                }
                const property = endPointData.body[prop];
                if (property.required !== undefined || lodash_isboolean_1.default(property.required)) {
                    throw new Error(`the property ${prop}'s 'required' value must either be true or false. boolean required`);
                }
            });
        });
    }
    /**
     * Returns true if the endpoints body contains a key value pair with the key
     * If the body does contain this key then true is returned, else false
     *
     * @param {string} endpoint
     * @param {string} key
     * @returns {boolean}
     * @memberof BodyDQL
     */
    endPointBodycontainsKeys(endpoint, key) {
        return this.data[endpoint] !== undefined && this.data[endpoint].body[key] !== undefined;
    }
    validate(request) {
        let errors = [];
        const endpoint = this.getEndpoint(request.originalPath);
        Object.keys(endpoint.body).forEach(key => {
            const prop = this.getEndpointProperty(endpoint, key);
            const required = prop.required === undefined ? false : prop.required;
            const value = request.body[key];
            if (value === undefined && required === true) {
                errors.push(new Error(`property ${key} does not exist on endpoint ${request.originalPath}`));
            }
            /// if the value is not required then ignore it
            if (value === undefined) {
                return;
            }
            /// if the value exists then it should be type checked regardless
            let validatedErrors = this.validateEndpointTypesMatch(prop, value);
            errors = errors.concat(validatedErrors);
        });
        if (errors.length > 0) {
            throw new Error('Bad Request');
        }
        return errors;
    }
    /**
     * validates that the value provided has the matching type
     *
     * @param {BodyDQLEndpointProperty} property
     * @param {*} value
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    validateEndpointTypesMatch(property, value) {
        let errors = [];
        switch (property.type) {
            case 'boolean':
                if (!lodash_isboolean_1.default(value)) {
                    errors.push(new Error('value is not boolean'));
                }
                break;
            case 'number':
                if (!lodash_isnumber_1.default(value)) {
                    errors.push(new Error('value is not a number'));
                }
                break;
            default: break;
        }
        if (errors.length === 0) {
            return [];
        }
        const customeErrors = this.getErrorsForProperty('type', property);
        switch (customeErrors.length > 0) {
            case true:
                return customeErrors;
            default:
                return errors;
        }
    }
    /**
     * Returns custom errors for this property and which errors key is relates to
     * so the prop defines which body property it is on the propertyKey defined attribute which it is testing
     * for example if it is testing the type then the property key would be type.
     * If none exists then the default error will be used
     *
     * @param {string} propertyKey
     * @param {BodyDQLEndpointProperty} prop
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    getErrorsForProperty(propertyKey, prop) {
        if (prop.errors !== undefined && prop.errors[propertyKey] !== undefined) {
            return prop.errors[propertyKey].map(error => { return new Error(error); });
        }
        return [];
    }
}
exports.BodyDQL = BodyDQL;
//# sourceMappingURL=index.js.map