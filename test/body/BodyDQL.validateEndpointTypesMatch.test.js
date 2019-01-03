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
    "returns custom array of errors for property isOld when the type of the value does not match the types specification"() {
        this.data = {
            "/app": {
                body: {
                    isOld: {
                        type: 'boolean',
                        required: false,
                        errors: {
                            type: [
                                'the isOld property must be either true or false'
                            ],
                            required: [
                                'The isOld property is required'
                            ]
                        }
                    }
                }
            }
        };
        const endPoint = this.getEndpoint('/app');
        let errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), true);
        chai_1.expect(errors.length).to.equal(0);
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), false);
        chai_1.expect(errors.length).to.equal(0);
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), 1);
        chai_1.expect(errors.length).to.equal(1);
        chai_1.expect(errors[0].message).to.equal('the isOld property must be either true or false');
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), 'true');
        chai_1.expect(errors.length).to.equal(1);
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), 'false');
        chai_1.expect(errors.length).to.equal(1);
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), 1);
        chai_1.expect(errors.length).to.equal(1);
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), 0);
        chai_1.expect(errors.length).to.equal(1);
        errors = this.validateEndpointTypesMatch(this.getEndpointProperty(endPoint, 'isOld'), 'boolean');
        chai_1.expect(errors.length).to.equal(1);
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "returns custom array of errors for property isOld when the type of the value does not match the types specification", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - validateEndpointTypesMatch')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.validateEndpointTypesMatch.test.js.map