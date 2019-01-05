import { BodyDQLEndpoint } from '../src/body/BodyDQLEndpoint';

const endpoint: BodyDQLEndpoint = {
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
