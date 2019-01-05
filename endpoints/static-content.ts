import { DQLEndpoint } from '../src/DQLEndpoint';

const endpoint: DQLEndpoint = {
    body : {},
    method: 'GET',
    options: {
        publicDir: 'endpoints/public'
    }

}

export default {
    path: '/static-content',
    endpoint
}
 