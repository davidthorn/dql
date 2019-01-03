"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint = {
    body: {},
    middleware: (req, res) => {
        res.status(200).send({
            message: 'it homes'
        });
    }
};
exports.default = {
    path: '/home',
    endpoint
};
//# sourceMappingURL=app.js.map