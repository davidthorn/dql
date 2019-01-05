"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint = {
    body: {
        name: {
            type: 'string',
            required: true
        }
    },
    middleware: (req, res) => {
        res.status(200).send({
            message: 'it homes'
        });
    },
    method: 'POST'
};
exports.default = {
    path: '/home',
    endpoint
};
//# sourceMappingURL=home.js.map