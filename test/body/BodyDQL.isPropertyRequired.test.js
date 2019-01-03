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
    "validates if a property is required to be validated"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'string',
                        required: true
                    },
                    middleName: {
                        type: 'string',
                        required: false
                    },
                    surname: {
                        type: 'string'
                    },
                    age: {
                        type: 'number',
                        required: undefined
                    }
                }
            }
        };
        const endPoint = this.getEndpoint('/app');
        const nameProperty = this.getEndpointProperty(endPoint, 'name');
        const middleNameProperty = this.getEndpointProperty(endPoint, 'middleName');
        const surnameProperty = this.getEndpointProperty(endPoint, 'surname');
        const ageProperty = this.getEndpointProperty(endPoint, 'age');
        let result = this.isPropertyRequired(nameProperty);
        chai_1.expect(result).to.be.equal(true);
        result = this.isPropertyRequired(nameProperty);
        chai_1.expect(result, "nameProperty").to.be.equal(true);
        result = this.isPropertyRequired(middleNameProperty);
        chai_1.expect(result, 'middleNameProperty').to.be.equal(false);
        result = this.isPropertyRequired(surnameProperty);
        chai_1.expect(result, "surnameProperty").to.be.equal(false);
        result = this.isPropertyRequired(ageProperty);
        chai_1.expect(result, 'ageProperty').to.be.equal(false);
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "validates if a property is required to be validated", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - isPropertyRequired')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.isPropertyRequired.test.js.map