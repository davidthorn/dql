import { DQLEndpoint } from '../src/DQLEndpoint';

const endpoint: DQLEndpoint = {
    body : {

    },
    middleware: (req, res) => {
        res.status(200).send({
            mesage: 'mother fucker',
            body: req.originalUrl
        })
    },
    method: 'POST'
}

export default {
    path: '/',
    endpoint
}
