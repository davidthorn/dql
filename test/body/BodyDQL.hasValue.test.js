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
    "validates has Value return true and false for all various values"() {
        chai_1.expect(this.hasValue(1)).true;
        chai_1.expect(this.hasValue('')).false;
        chai_1.expect(this.hasValue('hello')).true;
        chai_1.expect(this.hasValue(undefined)).false;
        chai_1.expect(this.hasValue(null)).false;
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "validates has Value return true and false for all various values", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - hasValue')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.hasValue.test.js.map