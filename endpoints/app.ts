import { DQLEndpoint } from "../src/DQLEndpoint";

const endpoint: DQLEndpoint =  {
    body: {
        name: {
            type: 'string',
            required: true,
            errors: {
                type: [ "You are an idiot" ]
            },
            parse: JSON.parse
        },
        surname: {
            type: 'boolean' 
        },
        isOld: {
            type: 'boolean'
        },
        age: {
            type: 'number'
        }
    }, 
    method: 'POST', 
    
    middleware: (req, res) => {
        res.status(200).send({
            mesage: 'mother fucker /app' , 
            body: req.originalUrl
        })
    }
}

export default {
    path: '/app',
    endpoint
}