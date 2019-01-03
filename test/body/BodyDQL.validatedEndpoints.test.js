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
    constructor() {
        super(...arguments);
        this.goodMockdata = {
            "/app": {
                name: "a name"
            }
        };
        this.badMockdata = {};
    }
    "throws and error when a top level property does not start with a forward slash"() {
        this.data = {
            "invalidendpoint/": {
                body: {}
            }
        };
        chai_1.expect(() => { this.validatedEndpoints(); }, 'validate end point should throw because endpoint does not start with forward slash').to.throw();
    }
    "throws an error when endpoint does not contain a body property"() {
        this.data = {
            "/app": {
                body: {}
            }
        };
        /// This can only be run without typescripts type checking
        ///expect(() => { this.validatedEndpoints() } , 'all endpoints must contain a body property').to.throw('all endpoints must contain a body property')
    }
    "throws an error when the endpoints body property does not exist"() {
        this.data = {
            "/app": {
                body: {}
            }
        };
        /// This can only be run without typescripts type checking
        //expect(() => { this.validatedEndpoints() } , 'an endpoint must contain a body property').to.throw('an endpoint must contain a body property')
    }
    "does not throws an error when an endpoints literal 'property-name' property is urlencoded"() {
        this.data = {
            "/app": {
                body: {
                    "my-property": {
                        type: "string"
                    }
                }
            }
        };
        chai_1.expect(() => { this.validatedEndpoints(); }, 'name property value must be urlencoded').to.not.throw('name property value must be urlencoded');
    }
    "throws an error when an endpoints literal 'property-name' property is not urlencoded"() {
        this.data = {
            "/app": {
                body: {
                    "my property": {
                        type: "string"
                    }
                }
            }
        };
        chai_1.expect(() => { this.validatedEndpoints(); }, 'name property value must be urlencoded').to.throw('name property value must be urlencoded');
    }
    "the required properties value if exists is boolean"() {
        this.data = {
            "/app": {
                body: {
                    "my-property": {
                        type: "string"
                    }
                }
            }
        };
        // /// This can only be run without typescripts type checking
        // expect(() => { this.validatedEndpoints() } , 
        // `the property my property's 'required' value must either be true or false. boolean required`)
        // .to.throw(`the property my property's 'required' value must either be true or false. boolean required`)
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "throws and error when a top level property does not start with a forward slash", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "throws an error when endpoint does not contain a body property", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "throws an error when the endpoints body property does not exist", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "does not throws an error when an endpoints literal 'property-name' property is urlencoded", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "throws an error when an endpoints literal 'property-name' property is not urlencoded", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "the required properties value if exists is boolean", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - validatedEndpoints')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.validatedEndpoints.test.js.map