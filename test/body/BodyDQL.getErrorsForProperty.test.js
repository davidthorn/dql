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
    "returns array of errors for property name when errors property exists"() {
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
        const typeErrors = this.getErrorsForProperty('type', this.getEndpointProperty(endPoint, 'isOld'));
        chai_1.expect(typeErrors.length).equal(1);
        chai_1.expect(typeErrors[0].message).to.equal('the isOld property must be either true or false');
        const requiredErrors = this.getErrorsForProperty('required', this.getEndpointProperty(endPoint, 'isOld'));
        chai_1.expect(requiredErrors.length).equal(1);
        chai_1.expect(requiredErrors[0].message).to.equal('The isOld property is required');
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "returns array of errors for property name when errors property exists", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - getErrorsForProperty')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.getErrorsForProperty.test.js.map