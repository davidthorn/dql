"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rootEndpoint = {
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
            parse: (v) => {
                return `${v} is surname`;
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
            },
            parse: (v) => {
                return 40;
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
            parse: (v) => {
                return `${v} is dob`;
            }
        }
    },
    middleware: (req, res) => {
        res.status(200).send({
            message: 'all good'
        });
    },
    method: 'POST'
};
const personEndpoint = {
    path: '/people',
    endpoint: rootEndpoint
};
exports.default = personEndpoint;
//# sourceMappingURL=people.js.map