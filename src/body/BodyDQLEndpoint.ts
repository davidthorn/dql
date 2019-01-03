import { BodyDQLEndpointProperty } from './BodyDQLEndpointProperty';
import { Request , Response } from 'express'

export type BodyDQLEndpoint = {
    
    /**
     *
     *
     * @type {{ [id: string]: BodyDQLEndpointProperty; }}
     */
    body: { [id: string]: BodyDQLEndpointProperty; };

    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

    header?: { [id: string]: string; };

    middleware?: (request: Request , response: Response , next: () => void ) => void
};
