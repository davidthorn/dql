import { BodyDQL } from "../../src/body/BodyDQL";
export declare class BodyDQLUnitTest extends BodyDQL {
    "validate throws an error when name property does not exist and required is true"(): void;
    "validate does not throw an error when name property does not exist and required is true"(): void;
    "validate throws an error when the type is boolean and value is not a classified boolean primitive"(): void;
    "validate throws an error when the type is number and value is not a classified number primitive"(): void;
    "validate throws an error when the properties value type does not match the endpoints property type"(): void;
    "properties in body which are not in defined in BodyQLEndpoint or ignored"(): void;
    "the properties value is validated even if it is not required"(): void;
}
