/// <reference path="../../node_modules/mocha-typescript/globals.d.ts"/>
/// <reference path="../../node_modules/@types/chai-http/index.d.ts"/>

chai.use(require('chai-http'));

export class BaseEndpointUnitTest {

    host: string = `${process.env.HOST}:${process.env.PORT}`

}
