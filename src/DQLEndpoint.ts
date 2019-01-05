import { DQLEndpointProperty } from './DQLEndpointProperty';
import { Request , Response } from 'express'

export interface DQLEndpoint {
    
    /**
     *
     *
     * @type {{ [id: string]: DQLEndpointProperty; }}
     */
    body: { [id: string]: DQLEndpointProperty; };

    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

    header?: { [id: string]: string; };

    middleware?: (request: Request , response: Response , next: () => void ) => void

    options?: {
        rootDir?: string,
        publicDir?: string
    }

};
