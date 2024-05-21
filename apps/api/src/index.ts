import express from 'express';
import cors from 'cors';
import { graphqlAPI } from './handlers/graphql';
import { getEnvVar } from '@side/utils/src/env/getEnvVar';
import { userAuthorizer } from './lib/mongo/userAuthorizer';
import expressBasicAuth from 'express-basic-auth';
import { json } from 'body-parser';

/**
 * The main entry point for the API.
 *
 * Setups the Express app and starts the server.
 * The express app allows CORS and implements basic auth via our users table in Mongo.
 */
const app = express();
const port = getEnvVar('PORT');
// IMPROVE: Add a whitelist of allowed cors origins
app.options('/graphql', cors());
app.use(expressBasicAuth({ authorizer: userAuthorizer, authorizeAsync: true }));
app.post('/graphql', cors(), json(), graphqlAPI);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
