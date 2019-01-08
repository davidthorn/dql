import { DQLEndpointProperty } from './DQLEndpointProperty';
import { Request , Response } from 'express'

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

    middleware?: (request: Request , response: Response , next: () => void ) => void

    options?: DQLEndpointOptions

    resourcePath: string

    env?: { [id:string] : string | undefined }
};
