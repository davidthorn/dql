import { DQLEndpoint } from '../src/DQLEndpoint';

const endpoint: DQLEndpoint = {
    body : {
        name: {
            type: 'string',
            required: true
        }
    },
    middleware: (req, res) => {
        res.status(200).send({
            message: 'it homes'
        })
    },
    method: 'GET',
    options: {
        rootDir: '/home/david/www/home',
        publicDir: 'public'
    }

}

export default {
    path: '/home',
    endpoint
}
 