import { DQLEndpoint } from '../src/DQLEndpoint';

const rootEndpoint: DQLEndpoint = {
    body: {
        name: {
            type: 'string',
            required: true,
            errors: {
                required: [
                    'The name is required'
                ]
            }
        },
        surname: {
            type: 'string',
            required: true,
            errors: {
                required: [
                    'The surname is required'
                ]
            },
            parse: (v: any): any => {
                return `${v} is surname`
            }
        },
        age: {
            type: 'number',
            required: true,
            errors: {
                required: [
                    'The age is required'
                ],
                type: [
                    'The value which you have provided is not a valid age'
                ]
            }
        },
        dob: {
            type: 'string',
            required: true,
            errors: {
                required: [
                    'The dob is required'
                ]
            },
            parse: (v: any): any => {
                return `${v} is dob`
            }
        }
    },
    middleware: (req, res) => {
        res.status(200).send({
            message: 'all good'
        })
    },
    method: 'REST',
    resourcePath: '/people'
}

const personEndpoint = {
    resourcePath: rootEndpoint.resourcePath,
    endpoint: rootEndpoint
}

export default personEndpoint