import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { usersRouter } from './users/users.router';
import { Pool } from 'pg';

// TODO Research this
// app.use(session({
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore
// }));

async function setupKeycloak() {
	// Retry a few times before giving up
	axiosRetry(axios, {
		retries: 10,
		retryDelay: () => {
			console.log('Keycloak setup failed, trying again in 30 seconds...');
			return 30000;
		}
	});

	console.log('Setting up keycloak...');
	try {
		const response = await axios.get(process.env.KEYCLOAK_URL + '/realms/' + process.env.REALM);
		const keycloakConfig = {
			realm: process.env.REALM,
			realmPublicKey: response.data.public_key,
			clientId: process.env.CLIENT_ID,
			authServerUrl: process.env.AUTH_SERVER_URL,
			bearerOnly: process.env.BEARER_ONLY,
			verifyTokenAudience: process.env.VERIFY_TOKEN_AUDIENCE
		};

		const memoryStore = new session.MemoryStore();
		// @ts-ignore KeycloakConfig type definition is not correct.
		const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

		console.log('Keycloak setup successful');
		return keycloak;
	} catch (e) {
		console.error('Failed to setup keycloak');
		process.exit();
	}
}

setupKeycloak().then(keycloak => {
	const app = express();
	const port = 3000;

	app.use(morgan('dev'), keycloak.middleware(), keycloak.protect());

	const pool: Pool = new Pool();
	app.use(usersRouter(pool));

	// start the Express server
	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`);
	});
});
