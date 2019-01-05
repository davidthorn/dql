import { BodyDQL } from "../../src/body/BodyDQL";
export declare class BodyDQLUnitTest extends BodyDQL {
    goodMockdata: {
        [id: string]: any;
    };
    badMockdata: {
        [id: string]: any;
    };
    "throws and error when a top level property does not start with a forward slash"(): void;
    "throws an error when endpoint does not contain a body property"(): void;
    "throws an error when the endpoints body property does not exist"(): void;
    "does not throws an error when an endpoints literal 'property-name' property is urlencoded"(): void;
    "throws an error when an endpoints literal 'property-name' property is not urlencoded"(): void;
    "the required properties value if exists is boolean"(): void;
}
