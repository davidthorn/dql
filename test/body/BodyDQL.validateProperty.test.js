"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='../../node_modules/mocha-typescript/globals.d.ts'/>
const BodyDQL_1 = require("../../src/body/BodyDQL");
const chai_1 = require("chai");
let BodyDQLUnitTest = class BodyDQLUnitTest extends BodyDQL_1.BodyDQL {
    "returns the correct number of errors message when invalid data provided"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'string',
                        required: true,
                        errors: {
                            type: ["You are an idiot"]
                        }
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
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                name: 'david',
                isOld: 1
            }
        };
        const endpoint = this.getEndpoint('/app');
        const nameErrors = this.validateProperty({
            property: this.getEndpointProperty(endpoint, 'name'),
            value: request.body.name
        });
        chai_1.expect(nameErrors.length).to.equal(0);
        const isOldErrors = this.validateProperty({
            property: this.getEndpointProperty(endpoint, 'isOld'),
            value: request.body.isOld
        });
        chai_1.expect(isOldErrors.length).to.equal(1);
        const l = this.validate({
            originalPath: request.originalPath,
            body: request.body
        });
        chai_1.expect(l.length).to.equal(1);
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "returns the correct number of errors message when invalid data provided", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - validateProperty')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.validateProperty.test.js.map