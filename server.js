"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("./endpoints/home"));
const app_1 = __importDefault(require("./endpoints/app"));
const root_1 = __importDefault(require("./endpoints/root"));
const people_1 = __importDefault(require("./endpoints/people"));
const DQL_1 = __importDefault(require("./src/DQL"));
const server = new DQL_1.default();
server.add(home_1.default.path, home_1.default.endpoint);
server.add(app_1.default.path, app_1.default.endpoint);
server.add(root_1.default.path, root_1.default.endpoint);
server.add(people_1.default.path, people_1.default.endpoint);
server.listen();
//# sourceMappingURL=server.js.map