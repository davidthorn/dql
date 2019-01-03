"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BodyDQL_1 = require("./body/BodyDQL");
const bodyParser = require("body-parser");
class DQL {
    constructor() {
        this.server = express_1.default();
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(bodyParser.json({}));
        this.endpoints = new BodyDQL_1.BodyDQL();
    }
    add(name, endpoint) {
        this.endpoints.add(name, endpoint);
        return this;
    }
    listen() {
        this.endpoints.getEndpoints().forEach(data => {
            const defaultMw = (req, res, next) => {
                console.log(req.body);
                const errors = this.endpoints.validate({
                    body: req.body === undefined ? {} : req.body,
                    originalPath: req.originalUrl
                });
                if (errors.length > 0) {
                    res.status(400).send({
                        statCode: 400,
                        message: 'Bad Request',
                        errors: errors.map(i => { return i.message; })
                    });
                }
                else {
                    next();
                }
            };
            this.server.post(data.path, defaultMw);
            if (data.endpoint.middleware === undefined)
                return;
            this.server.post(data.path, data.endpoint.middleware);
        });
        this.server.use((req, res) => {
            res.status(404).send({
                status: 404,
                message: 'Not Found',
                path: req.originalUrl
            });
        });
        this.server.listen(this.port || 3000, this.host || 'localhost', () => {
            console.log('listening');
        });
        // this.server.get('/' , (req, res) => {
        //     console.log('request received')
        // })
    }
}
exports.DQL = DQL;
exports.default = DQL;
//# sourceMappingURL=DQL.js.map