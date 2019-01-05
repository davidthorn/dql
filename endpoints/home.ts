import { BodyDQLEndpoint } from '../src/body/BodyDQLEndpoint';

const endpoint: BodyDQLEndpoint = {
    body : {
        
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
