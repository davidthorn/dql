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
        let result = this.shouldValidateProperty(nameProperty, 'name');
        chai_1.expect(result).to.be.equal(true);
        result = this.shouldValidateProperty(nameProperty, '');
        chai_1.expect(result, "nameProperty , ''").to.be.equal(true);
        result = this.shouldValidateProperty(nameProperty, undefined);
        chai_1.expect(result, 'nameProperty , undefined').to.be.equal(true);
        result = this.shouldValidateProperty(nameProperty, null);
        chai_1.expect(result, 'nameProperty , null').to.be.equal(true);
        result = this.shouldValidateProperty(middleNameProperty, undefined);
        chai_1.expect(result, 'middleNameProperty , undefined').to.be.equal(false);
        result = this.shouldValidateProperty(middleNameProperty, null);
        chai_1.expect(result, 'middleNameProperty , null').to.be.equal(false);
        result = this.shouldValidateProperty(middleNameProperty, 'james');
        chai_1.expect(result, "middleNameProperty , 'james'").to.be.equal(true);
        result = this.shouldValidateProperty(surnameProperty, 'thorn');
        chai_1.expect(result, "surnameProperty , 'thorn'").to.be.equal(true);
        result = this.shouldValidateProperty(surnameProperty, undefined);
        chai_1.expect(result).to.be.equal(false);
        result = this.shouldValidateProperty(surnameProperty, null);
        chai_1.expect(result, 'surnameProperty , null').to.be.equal(false);
        result = this.shouldValidateProperty(ageProperty, 40);
        chai_1.expect(result, 'ageProperty , 40').to.be.equal(true);
        result = this.shouldValidateProperty(ageProperty, undefined);
        chai_1.expect(result, 'ageProperty , undefined').to.be.equal(false);
        result = this.shouldValidateProperty(ageProperty, null);
        chai_1.expect(result, 'ageProperty , null').to.be.equal(false);
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "validates if a property is required to be validated", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - shouldValidateProperty')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.shouldValidateProperty.test.js.map