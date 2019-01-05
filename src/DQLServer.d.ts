import { DQLEndpoint } from './DQLEndpoint';
import e, { Response, Request } from 'express';
import { DQLEndpointManager } from './DQLEndpointManager';
export declare class DQLServer {
    server: e.Express;
    port?: number;
    host?: string;
    endpoints: DQLEndpointManager;
    constructor();
    /**
     * This method handles static content for the endpoint
     * An endpoint should implement the options property and supply
     * add the publicDir property with the name of the folder in which the static files are located
     *
     *
     * @param {{ path: string , endpoint: DQLEndpoint}} data
     * @memberof DQLServer
     */
    handleStaticContent(data: {
        path: string;
        endpoint: DQLEndpoint;
    }): void;
    /**
     * This is the first middleware which will be called for all requests
     * If this method does not find a middleware with a path which matches the originalUrl of the request
     * then a 404 will be returned
     * This method does not check if the endpoint can handle the request just that their urls match
     *
     * @param {Request} request
     * @param {Response} response
     * @param {() => void} next
     * @memberof DQL
     */
    handleNotFound(request: Request, response: Response, next: () => void): void;
    /**
     * This method will check that their is an endpoint which can handle this originalUrl
     * If the endpoints method property matches that of the requests then the next method will be called
     * If the methods do not match then a 405 status will be returned
     *
     * @param {Request} request
     * @param {Response} response
     * @param {() => void} next
     * @memberof DQL
     */
    handleMethodNotAllowed(request: Request, response: Response, next: () => void): void;
    /**
     * Adds an endpoint to the manager with this path
     *
     * @param {string} path
     * @param {DQLEndpoint} endpoint
     * @returns {DQLServer}
     * @memberof DQLServer
     */
    add(path: string, endpoint: DQLEndpoint): DQLServer;
    handleNotHandledEndpoint(): void;
    /**
     * Starts the express server to listen for all requests
     * This method will start all endpoints which have been registered prior listen being executed
     *
     * @memberof DQLServer
     */
    listen(): void;
    handleStatusCode(chunk: any, encoding?: string, cb?: () => void): void;
}
export default DQLServer;
