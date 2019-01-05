import { DQLEndpointProperty } from './DQLEndpointProperty';
import { DQLEndpoint } from './DQLEndpoint';
export declare class DQLEndpointManager {
    /**
     *
     *
     * @type {{ [id: string]: DQLEndpoint }}
     * @memberof BodyDQL
     */
    data: {
        [id: string]: DQLEndpoint;
    };
    constructor();
    add(name: string, endpoint: DQLEndpoint): void;
    getEndpoints(): {
        path: string;
        endpoint: DQLEndpoint;
    }[];
    hasEndpoint(path: string): boolean;
    /**
     *
     *
     * @returns {{ [id: string]: any }}
     * @memberof BodyDQL
     */
    loadFile(): {
        [id: string]: any;
    };
    /**
     *
     *
     * @param {string} key
     * @returns {DQLEndpoint}
     * @memberof BodyDQL
     */
    getEndpoint(key: string): DQLEndpoint;
    /**
     *
     *
     * @param {DQLEndpoint} endpoint
     * @returns {BodyDQLEndpointProperty[]}
     * @memberof BodyDQL
     */
    getEndpointProperties(endpoint: DQLEndpoint): DQLEndpointProperty[];
    /**
     *
     *
     * @param {DQLEndpoint} endPoint
     * @param {string} propname
     * @returns {BodyDQLEndpointProperty}
     * @memberof BodyDQL
     */
    getEndpointProperty(endPoint: DQLEndpoint, propname: string): DQLEndpointProperty;
    /**
     * Validates all endpoints
     * This method will throw an error if it finds any issue with any of the endpoints
     *
     * @memberof BodyDQL
     */
    validatedEndpoints(): void;
    /**
     * Returns true if the endpoints body contains a key value pair with the key
     * If the body does contain this key then true is returned, else false
     *
     * @param {string} endpoint
     * @param {string} key
     * @returns {boolean}
     * @memberof BodyDQL
     */
    endPointBodycontainsKeys(endpoint: string, key: string): boolean;
    /**
     *
     *
     * @param {{ originalPath: string, body: any }} request
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    validate(request: {
        originalPath: string;
        body: any;
    }): Error[];
    /**
     *
     *
     * @param {({ property: BodyDQLEndpointProperty, value: any | undefined | null })} data
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    validateProperty(data: {
        property: DQLEndpointProperty;
        value: any | undefined | null;
    }): Error[];
    catchParse(value: any, p: (v: any) => any): any;
    /**
     * validates that the value provided has the matching type
     *
     * @param {BodyDQLEndpointProperty} property
     * @param {*} value
     * @returns {Error[]}
     * @memberof BodyDQL
     */
    validateEndpointTypesMatch(property: DQLEndpointProperty, value: any): Error[];
    /**
     * Returns true if the value is not undefined or null
     * and if a string it has more then 0 chars
     *
     * @param {(any | undefined | null)} value
     * @returns {boolean}
     * @memberof BodyDQL
     */
    hasValue(value: any | undefined | null): boolean;
    /**
     * Returns true if the required property is defined and is true
     * Returns false if required property is undefined or null or is false
     *
     * @param {BodyDQLEndpointProperty} property
     * @returns {boolean}
     * @memberof BodyDQL
     */
    isPropertyRequired(property: DQLEndpointProperty): boolean;
    /**
     * Returns true if value is not undefined or null and required property is not undefined or null and is true
     * Returns false if required property is undefined or null
     *
     * @param {BodyDQLEndpointProperty} property
     * @param {(any | undefined | null)} value
     * @returns {boolean}
     * @memberof BodyDQL
     */
    shouldValidateProperty(property: DQLEndpointProperty, value: any | undefined | null): boolean;
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
    getErrorsForProperty(propertyKey: string, prop: DQLEndpointProperty): Error[];
}
