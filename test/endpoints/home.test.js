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
    "POST /home 200"() {
        chai_1.default.request(this.host)
            .post('/home')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(200);
        });
    }
    "POST /home 400 - invalid body data"() {
        chai_1.default.request(this.host)
            .post('/home')
            .type('json')
            .send({
            name: 1
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(200);
        });
    }
    "GET /home/index.html 404"() {
        chai_1.default.request(this.host)
            .get('/home/index.html')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(404);
        });
    }
    "PATCH /home 405"() {
        chai_1.default.request(this.host)
            .patch('/home')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(405);
        });
    }
    "DELETE /home 405"() {
        chai_1.default.request(this.host)
            .del('/home')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(405);
        });
    }
    "GET /home 405"() {
        chai_1.default.request(this.host)
            .get('/home')
            .type('json')
            .send({
            name: 'david'
        })
            .end((error, res) => {
            chai_1.expect(res.status).to.be.equal(405);
        });
    }
};
__decorate([
    test
], T.prototype, "POST /home 200", null);
__decorate([
    test
], T.prototype, "POST /home 400 - invalid body data", null);
__decorate([
    test
], T.prototype, "GET /home/index.html 404", null);
__decorate([
    test
], T.prototype, "PATCH /home 405", null);
__decorate([
    test
], T.prototype, "DELETE /home 405", null);
__decorate([
    test
], T.prototype, "GET /home 405", null);
T = __decorate([
    suite('Home Endpoint')
], T);
exports.T = T;
//# sourceMappingURL=home.test.js.map