import { DQLEndpoint } from '../src/DQLEndpoint';

const rootEndpoint: DQLEndpoint = {
    body: {
       
    },
    middleware: (req, res) => {
        res.status(200).send({
            message: 'Welcome to this app'
        })
    },
    method: 'GET',
    resourcePath: '/app'
}

const personEndpoint = {
    resourcePath: rootEndpoint.resourcePath,
    endpoint: rootEndpoint
}

export default personEndpoint