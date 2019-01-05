"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint = {
    body: {
        name: {
            type: 'string',
            required: true,
            errors: {
                type: ["You are an idiot"]
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
            mesage: 'mother fucker /app',
            body: req.originalUrl
        });
    }
};
exports.default = {
    path: '/app',
    endpoint
};
//# sourceMappingURL=app.js.map