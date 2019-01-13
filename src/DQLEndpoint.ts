import { DQLEndpointProperty } from './DQLEndpointProperty';
import { Request, Response, RequestHandler } from 'express'

export interface DQLEndpointOptions {
    rootDir?: string
    publicDir?: string
}

export interface DQLEndpoint {

    /**
     *
     *
     * @type {{ [id: string]: DQLEndpointProperty; }}
     */
    body: { [id: string]: DQLEndpointProperty; };

    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'REST'

    header?: { [id: string]: string; };

    middleware?: RequestHandler[] | RequestHandler

    options?: DQLEndpointOptions

    resourcePath: string

    env?: { [id: string]: string | undefined }
};
