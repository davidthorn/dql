"use strict";
/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
chai_1.default.use(require('chai-http'));
let T = class T {
    constructor() {
        this.host = 'localhost:3000';
    }
    "/app 200"() {
        chai_1.default.request(this.host)
            .post('/app')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(200);
        });
    }
    "/app 404"() {
        chai_1.default.request(this.host)
            .post('/unknown')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            //expect(res.status).to.be.equal(404)
            //expect(res.body.statusCode , 'res.body.statusCode').to.equal(404)
            chai_1.expect(res.body.message, 'res.body.statusCode').to.equal('Not Found');
        });
    }
    "/ 404"() {
        chai_1.default.request(this.host)
            .post('/')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(404);
            console.log(res.body);
            chai_1.expect(res.body.statusCode, 'res.body.statusCode').to.equal(404);
            // expect(res.body.message , 'res.body.statusCode').to.equal('Not Found')
        });
    }
    "/app 400 with string property with a boolean value"() {
        chai_1.default.request(this.host)
            .post('/app')
            .type('form')
            .send({
            name: true
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(400);
            chai_1.expect(res.body.message).to.not.be.undefined;
            chai_1.expect(res.body.statusCode).to.be.not.undefined;
        });
    }
    "/app 400 with string property with a number value"() {
        chai_1.default.request(this.host)
            .post('/app')
            .type('form')
            .send({
            name: 1
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(400);
            chai_1.expect(res.body.message).to.not.be.undefined;
            chai_1.expect(res.body.statusCode).to.not.be.undefined;
        });
    }
    "/app 400 with boolean property with a number value"() {
        chai_1.default.request(this.host)
            .post('/app')
            .type('json')
            .send({
            name: 'david',
            isOld: 1
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(400);
            chai_1.expect(res.body.message).to.not.be.undefined;
            chai_1.expect(res.body.statusCode).to.not.be.undefined;
        });
    }
};
__decorate([
    test
], T.prototype, "/app 200", null);
__decorate([
    test
], T.prototype, "/app 404", null);
__decorate([
    test
], T.prototype, "/ 404", null);
__decorate([
    test
], T.prototype, "/app 400 with string property with a boolean value", null);
__decorate([
    test
], T.prototype, "/app 400 with string property with a number value", null);
__decorate([
    test
], T.prototype, "/app 400 with boolean property with a number value", null);
T = __decorate([
    suite('DQL Server ')
], T);
exports.T = T;
//# sourceMappingURL=server.test.js.map