"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
const body_1 = require("../../src/body");
const chai_1 = require("chai");
let BodyDQLUnitTest = class BodyDQLUnitTest extends body_1.BodyDQL {
    "loadFile returns an object"() {
        const data = this.loadFile();
        chai_1.expect(data).to.not.be.undefined;
        chai_1.expect(data["/app"]).to.not.be.undefined;
    }
    "this.data has been set after calling loadFile"() {
        const data = this.loadFile();
        chai_1.expect(data).to.not.be.undefined;
        chai_1.expect(data["/app"]).to.not.be.undefined;
        chai_1.expect(this.data).to.equal(data);
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "loadFile returns an object", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "this.data has been set after calling loadFile", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=index.test.js.map