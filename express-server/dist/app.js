"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const keycloak_connect_1 = __importDefault(require("keycloak-connect"));
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const users_router_1 = require("./users/users.router");
// TODO Research this
// app.use(session({
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore
// }));
function setupKeycloak() {
    return __awaiter(this, void 0, void 0, function* () {
        // Retry a few times before giving up
        (0, axios_retry_1.default)(axios_1.default, {
            retries: 10,
            retryDelay: () => {
                console.log('Keycloak setup failed, trying again in 30 seconds...');
                return 30000;
            }
        });
        console.log('Setting up keycloak...');
        try {
            const response = yield axios_1.default.get(process.env.DOCKER_AUTH_SERVER_URL + '/realms/' + process.env.REALM);
            const keycloakConfig = {
                realm: process.env.REALM,
                realmPublicKey: response.data.public_key,
                clientId: process.env.CLIENT_ID,
                authServerUrl: process.env.AUTH_SERVER_URL,
                bearerOnly: process.env.BEARER_ONLY,
                verifyTokenAudience: process.env.VERIFY_TOKEN_AUDIENCE
            };
            const memoryStore = new express_session_1.default.MemoryStore();
            // @ts-ignore KeycloakConfig type definition is not correct.
            const keycloak = new keycloak_connect_1.default({ store: memoryStore }, keycloakConfig);
            console.log('Keycloak setup successful');
            return keycloak;
        }
        catch (e) {
            console.error('Failed to setup keycloak');
            process.exit();
        }
    });
}
setupKeycloak().then(keycloak => {
    const app = (0, express_1.default)();
    const port = 3000;
    app.use((0, morgan_1.default)('dev'), keycloak.middleware(), keycloak.protect());
    app.use(users_router_1.usersRouter);
    // start the Express server
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
});
