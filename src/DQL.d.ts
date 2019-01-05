import { BodyDQLEndpoint } from '../src/body/BodyDQLEndpoint';
import e, { Response, Request } from 'express';
import { BodyDQL } from './body/BodyDQL';
export declare class DQL {
    server: e.Express;
    port?: number;
    host?: string;
    endpoints: BodyDQL;
    constructor();
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
    add(name: string, endpoint: BodyDQLEndpoint): DQL;
    handleNotHandledEndpoint(): void;
    listen(): void;
}
export default DQL;
