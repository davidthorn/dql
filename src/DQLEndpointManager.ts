import isboolean from 'lodash.isboolean'
import isnumber from 'lodash.isnumber'
import isstring from 'lodash.isstring'
import { DQLEndpointProperty } from './DQLEndpointProperty';
import { DQLEndpoint } from './DQLEndpoint';

export class DQLEndpointManager {

    /**
     *
     *
     * @type {{ [id: string]: DQLEndpoint }}
     * @memberof BodyDQL
     */
    data: { [id: string]: DQLEndpoint }

    constructor() {
        this.data = {}
    }

    add(name: string, endpoint: DQLEndpoint) {
        this.data[name] = endpoint
    }

    getEndpoints(): { path: string, endpoint: DQLEndpoint }[] {
        return Object.keys(this.data).map(key => {
            return {
                path: key,
                endpoint: this.getEndpoint(key)
            }
        })
    }

    hasEndpoint(path: string): boolean {
        return this.getEndpoints().filter(i => { return (i.path === path) ? i : undefined }).length > 0
    }

    /**
     *
     *
     * @returns {{ [id: string]: any }}
     * @memberof BodyDQL
     */
    loadFile(): { [id: string]: any } { 
        this.data = {
            "/app": {
                body: {
                    propertyName: {
                        type: Boolean
                    }
                },
                method: 'GET'
            }
        }

        return this.data
    }

    /**
     *
     *
     * @param {string} key
     * @returns {DQLEndpoint}
     * @memberof BodyDQL
     */
    getEndpoint(key: string): DQLEndpoint {
        if (this.data[key] === undefined) {
            throw new Error(`endpoint with key ${key} does not exist`)
        }

        return this.data[key]
    }

    /**
     *
     *
     * @param {DQLEndpoint} endpoint
     * @returns {BodyDQLEndpointProperty[]}
     * @memberof BodyDQL
     */
    getEndpointProperties(endpoint: DQLEndpoint): DQLEndpointProperty[] {
        return Object.keys(endpoint.body).map(k => { return endpoint.body[k] })
    }

    /**
     *
     *
     * @param {DQLEndpoint} endPoint
     * @param {string} propname
     * @returns {BodyDQLEndpointProperty}
     * @memberof BodyDQL
     */
    getEndpointProperty(endPoint: DQLEndpoint, propname: string): DQLEndpointProperty {

        if (endPoint.body[propname] === undefined) {
            throw new Error(`endpoint property with key ${propname} does not exist`)
        }

        const prop = endPoint.body[propname]
        prop.name = propname
        return prop
    }

    /**
     * Validates all endpoints
     * This method will throw an error if it finds any issue with any of the endpoints
     *
     * @memberof BodyDQL
     */
    validatedEndpoints() {

        Object.keys(this.data).forEach(endPoint => {

            const d = endPoint.match(/^\/([\w\d\-]+)/)
            if (d === null) {
                throw new Error('all endpoints must start with a forwardslash')
            }

            const endPointData = this.data[endPoint]

            if(endPointData.method === 'GET' ) return

            if (endPointData.body === undefined || endPointData.body === null) {
                throw new Error('all endpoints must contain a body property')
            }

            /// validate all body properties literal names are urlencoded
            Object.keys(endPointData.body).forEach(prop => {

                if (encodeURI(prop) !== prop) {
                    throw new Error('name property value must be urlencoded')
                }

                const property = endPointData.body[prop]
                property.name = prop /// set the name for other functions to use

                if (property.required !== undefined || isboolean(property.required)) {
                    throw new Error(`the property ${prop}'s 'required' value must either be true or false. boolean required`)
                }
            })
        })
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
    endPointBodycontainsKeys(endpoint: string, key: string): boolean {
        return this.data[endpoint] !== undefined && this.data[endpoint].body[key] !== undefined
    }

    /**
     *
     *
     * @param {{ originalPath: string, body: any }} request
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    validate(request: { originalPath: string, body: any }): Error[] {

        const startErrors: Error[] = []

        const endpoint = this.getEndpoint(request.originalPath)

        const errors: Error[] = Object.keys(endpoint.body)
            .map(key => {
                return {
                    property: this.getEndpointProperty(endpoint, key),
                    value: request.body[key]
                }
            })
            .reduce((r, f) => { return r.concat(this.validateProperty(f)) }, startErrors)

        if (errors.length > 0) {
            //throw new Error('Bad Request')
        }

        return errors

    }

    /**
     * 
     *
     * @param {({ property: BodyDQLEndpointProperty, value: any | undefined | null })} data
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    validateProperty(data: { property: DQLEndpointProperty, value: any | undefined | null }): Error[] {

        const { property, value } = data

        let errors: Error[] = []

        const required = this.isPropertyRequired(property)

        if (!required && !this.hasValue(value)) {
            return []
        }

        if (!this.shouldValidateProperty(property, value)) {
            return []
        }

        if (value === undefined) {
            const requiredErrors = this.getErrorsForProperty('required', property)
            const requiredError = new Error(`property ${property.name!} does not exist`)
            errors = errors.concat(requiredErrors.length > 0 ? requiredErrors : [requiredError])
        }

        /// if the value exists then it should be type checked regardless
        let validatedErrors = this.validateEndpointTypesMatch(property, value)
        errors = errors.concat(validatedErrors)

        return errors

    }

    catchParse(value: any , p: (v: any) => any): any {
        try {
            return p(value)
        }catch(error) {
            return value
        }
    }

    /**
     * validates that the value provided has the matching type
     *
     * @param {BodyDQLEndpointProperty} property
     * @param {*} value
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    validateEndpointTypesMatch(property: DQLEndpointProperty, value: any): Error[] {
        let errors: Error[] = []
       
        const parse = property.parse === undefined ? (i: any) => { return i } : property.parse! 

        const parsedValue = this.catchParse(value , parse)

        switch (property.type) {
            case 'boolean':
                if (!isboolean(parsedValue)) {
                    errors.push(new Error('value is not boolean'))
                }
                break;
            case 'number':
                if (!isnumber(parsedValue)) {
                    errors.push(new Error('value is not a number'))
                }
                break; 
            case 'string':
                
                if (isboolean(parsedValue)) {
                    errors.push(new Error('value is boolean and not a string'))
                } 
                if (!isstring(parsedValue)) {
                    errors.push(new Error('value is not a string'))
                }   
                break;
            default: break
        }

        if (errors.length === 0) {
            return []
        }

        const customeErrors = this.getErrorsForProperty('type', property)
        switch (customeErrors.length > 0) {
            case true:
                return customeErrors
            default:
                return errors
        }
    }

    /**
     * Returns true if the value is not undefined or null
     * and if a string it has more then 0 chars
     *
     * @param {(any | undefined | null)} value
     * @returns {boolean}
     * @memberof BodyDQL
     */
    hasValue(value: any | undefined | null): boolean {
        const result = value !== undefined && value !== null
        if (result === true && typeof value === 'string') {
            return value.length > 0
        }

        return result
    }

    /**
     * Returns true if the required property is defined and is true
     * Returns false if required property is undefined or null or is false
     *
     * @param {BodyDQLEndpointProperty} property
     * @returns {boolean}
     * @memberof BodyDQL
     */
    isPropertyRequired(property: DQLEndpointProperty): boolean {
        return property.required === undefined ? false : property.required!
    }

    /**
     * Returns true if value is not undefined or null and required property is not undefined or null and is true
     * Returns false if required property is undefined or null
     *
     * @param {BodyDQLEndpointProperty} property
     * @param {(any | undefined | null)} value
     * @returns {boolean}
     * @memberof BodyDQL
     */
    shouldValidateProperty(property: DQLEndpointProperty, value: any | undefined | null): boolean {
        // let errors: Error[] = []
        switch (this.hasValue(value)) {
            case true: return true
            case false:
                return this.hasValue(property.required) ? property.required! : false
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
    getErrorsForProperty(propertyKey: string, prop: DQLEndpointProperty): Error[] {
        if (prop.errors !== undefined && prop.errors[propertyKey] !== undefined) {
            return prop.errors[propertyKey].map(error => { return new Error(error) })
        }

        return []
    }

}