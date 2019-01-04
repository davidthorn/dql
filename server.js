"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const DQL_1 = __importDefault(require("./src/DQL"));
const server = new DQL_1.default();
server.add(app_1.default.path, app_1.default.endpoint);
server.add('/app', {
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
})
    .add('/', {
    body: {},
    middleware: (req, res) => {
        res.status(200).send({
            mesage: 'mother fucker',
            body: req.originalUrl
        });
    }
})
    .listen();
// const server = DQL.server
// // server.listen(3000 , 'localhost' , () => {
// // })
//# sourceMappingURL=server.js.map