const express = require('express')
const morgan = require('morgan')
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const axios = require('axios');
const axiosRetry = require('axios-retry');
const dbConnection = require('./db/connection');
const dbRoutes = require('./db/routes');


// TODO Research this
// app.use(session({
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore
// }));

function setupKeycloak() {
    // Retry a few times before giving up
    axiosRetry(axios, { retries: 10, retryDelay: () => {
        console.log('Keycloak setup failed, trying again in 30 seconds...')
        return 30000;
    }});

    console.log('Setting up keycloak...')
    return axios.get(process.env.DOCKER_AUTH_SERVER_URL + '/realms/' + process.env.REALM)
    .then(response => {
        const keycloakConfig = {
            realm: process.env.REALM,
            realmPublicKey: response.data['public_key'],
            clientId: process.env.CLIENT_ID,
            authServerUrl: process.env.AUTH_SERVER_URL,
            bearerOnly: process.env.BEARER_ONLY,
            verifyTokenAudience: process.env.VERIFY_TOKEN_AUDIENCE,
        }
        
        const memoryStore = new session.MemoryStore();
        const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

        console.log('Keycloak setup successful')
        return keycloak;
    })
    .catch((e) => {
        console.error('Failed to setup keycloak')
    })
}

setupKeycloak().then(keycloak => {
    const app = express();
    const port = 3000;

    app.use(morgan('dev'), keycloak.middleware(), keycloak.protect(), dbRoutes)

    dbConnection.connectToServer(function (err) {
        if (err) {
            console.error('Failed to connect to database')
            process.exit();
        }
      
        // start the Express server
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`);
        })
      });
}).catch (e => {
    console.error('Initialization failed')
})
