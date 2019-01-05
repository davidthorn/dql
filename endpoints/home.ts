import { BodyDQLEndpoint } from '../src/body/BodyDQLEndpoint';

const endpoint: BodyDQLEndpoint = {
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
    method: 'POST'
}

export default {
    path: '/home',
    endpoint
}
