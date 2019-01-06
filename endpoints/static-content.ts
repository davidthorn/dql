import { DQLEndpoint } from '../src/DQLEndpoint';

const endpoint: DQLEndpoint = {
    body : {},
    method: 'GET',
    options: {
        publicDir: 'endpoints/public'
    },
    resourcePath: '/static-content'

}

export default {
    resourcePath: endpoint.resourcePath,
    endpoint
}
 