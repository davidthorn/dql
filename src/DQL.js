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
    handle404() {
        this.server.use((req, res, next) => {
            if (this.endpoints.hasEndpoint(req.originalUrl)) {
                return next();
            }
            else {
                res.status(404).send({
                    statusCode: 404,
                    message: 'Not Found',
                    path: req.originalUrl
                });
            }
        });
    }
    /// This middleware will be called at the end if no other middleware has sent a request back
    /// this will send a 404 if anyone has any other recommendation please contact me to tell me what it
    /// should be
    handleNotHandledEndpoint() {
        this.server.use((req, res, next) => {
            try {
                const endpoint = this.endpoints.getEndpoint(req.originalUrl);
                if (endpoint.middleware === undefined)
                    throw new Error();
                if (req.method !== endpoint.method)
                    throw new Error();
                endpoint.middleware(req, res, next);
            }
            catch (error) {
                res.status(404).send({
                    statusCode: 404,
                    message: 'Not Found',
                    path: req.originalUrl
                });
            }
        });
    }
    listen() {
        this.handle404();
        this.endpoints.getEndpoints().forEach(data => {
            const defaultMw = (req, res, next) => {
                if (req.method !== data.endpoint.method) {
                    return next();
                }
                const body = req.headers["content-type"] === "application/json" ? req.body : req.body;
                try {
                    const errors = this.endpoints.validate({
                        body: body === undefined ? {} : body,
                        originalPath: req.originalUrl
                    });
                    if (errors.length > 0) {
                        res.status(400).send({
                            statusCode: 400,
                            message: 'Bad Request',
                            errors: errors.map(i => { return i.message; }),
                            path: req.originalUrl
                        });
                    }
                    else {
                        next();
                    }
                }
                catch (error) {
                    next();
                }
            };
            this.server.use(data.path, defaultMw);
            if (data.endpoint.middleware === undefined)
                return;
            this.server.use(data.path, (req, res, next) => {
                if (data.endpoint.method === undefined) {
                    return next();
                }
                if (req.method === data.endpoint.method && data.endpoint.middleware !== undefined && data.path === req.originalUrl) {
                    data.endpoint.middleware(req, res, next);
                }
                else {
                    next();
                }
            });
        });
        this.handleNotHandledEndpoint();
        this.server.listen(this.port || 3000, this.host || 'localhost', () => {
            console.log('listening');
        });
    }
}
exports.DQL = DQL;
exports.default = DQL;
//# sourceMappingURL=DQL.js.map