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
    "validate throws an error when name property does not exist and required is true"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: Boolean,
                        required: true
                    }
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                "not-name": "test",
            }
        };
        chai_1.expect(() => { this.validate(request); }).to.throw();
    }
    "validate does not throw an error when name property does not exist and required is true"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: Boolean,
                        required: true
                    }
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                "name": "test",
            }
        };
        chai_1.expect(() => { this.validate(request); }).to.not.throw();
    }
    "validate throws an error when the type is boolean and value is not a classified boolean primitive"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'boolean',
                        required: true
                    }
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                "name": "true",
            }
        };
        chai_1.expect(() => { this.validate(request); }).to.throw();
        const request1 = {
            originalPath: '/app',
            body: {
                "name": "false",
            }
        };
        chai_1.expect(() => { this.validate(request1); }).to.throw();
    }
    "validate throws an error when the type is number and value is not a classified number primitive"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'number',
                        required: true
                    }
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                "name": "1",
            }
        };
        chai_1.expect(() => { this.validate(request); }).to.throw();
        const request1 = {
            originalPath: '/app',
            body: {
                "name": 1,
            }
        };
        chai_1.expect(() => { this.validate(request1); }).to.not.throw();
    }
    "validate throws an error when the properties value type does not match the endpoints property type"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'boolean',
                        required: true
                    }
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                "name": "true",
            }
        };
        chai_1.expect(() => { this.validate(request); }).to.throw();
    }
    "properties in body which are not in defined in BodyQLEndpoint or ignored"() {
        this.data = {
            "/app": {
                body: {
                    name: {
                        type: 'boolean',
                        required: false
                    }
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                "surame": "david",
                name: true
            }
        };
        chai_1.expect(() => { this.validate(request); }).to.not.throw();
    }
    "the properties value is validated even if it is not required"() {
        this.data = {
            "/app": {
                body: {
                    isOld: {
                        type: 'boolean',
                        required: false
                    }
                }
            }
        };
        const request = {
            originalPath: '/app',
            body: {
                isOld: false
            }
        };
        chai_1.expect(() => { this.validate(request); }).to.not.throw();
        this.data = {
            "/app": {
                body: {
                    isOld: {
                        type: 'boolean',
                        required: false
                    }
                }
            }
        };
        const request1 = {
            originalPath: '/app',
            body: {
                isOld: "no"
            }
        };
        chai_1.expect(() => { this.validate(request1); }).to.throw();
    }
};
__decorate([
    test
], BodyDQLUnitTest.prototype, "validate throws an error when name property does not exist and required is true", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "validate does not throw an error when name property does not exist and required is true", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "validate throws an error when the type is boolean and value is not a classified boolean primitive", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "validate throws an error when the type is number and value is not a classified number primitive", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "validate throws an error when the properties value type does not match the endpoints property type", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "properties in body which are not in defined in BodyQLEndpoint or ignored", null);
__decorate([
    test
], BodyDQLUnitTest.prototype, "the properties value is validated even if it is not required", null);
BodyDQLUnitTest = __decorate([
    suite('BodyDQLUnitTest - validate Request Body')
], BodyDQLUnitTest);
exports.BodyDQLUnitTest = BodyDQLUnitTest;
//# sourceMappingURL=BodyDQL.validate.js.map