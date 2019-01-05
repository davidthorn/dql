"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint = {
    body: {},
    middleware: (req, res) => {
        res.status(200).send({
            mesage: 'mother fucker',
            body: req.originalUrl
        });
    },
    method: 'POST'
};
exports.default = {
    path: '/',
    endpoint
};
//# sourceMappingURL=root.js.map