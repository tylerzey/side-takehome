import 'source-map-support/register';

import { assertAndFormatBody } from '@api/lib/graphql/assertAndFormatBody';
import { graphQLHandler } from '@api/lib/graphql/graphQLHandler';
import type { Response, Request } from 'express';
import { getEnvVar } from '@side/utils/src/env/getEnvVar';
import { sendSuccessResponse } from '@api/lib/express/sendSuccessResponse';
import { sendErrorResponse } from '@api/lib/express/sendErrorResponse';
import { APIContext, createGraphQLContext } from '@api/lib/createGraphQLContext';
import { StatusCodes } from '@side/utils/src/http/httpsConstants';
import { createMongoConnection } from '@api/lib/mongo/createMongoConnection';

const isConnected = createMongoConnection(getEnvVar('MONGO_URI'));

/**
 * Handles requests to the GraphQL API
 *
 * Returns a 401 Unauthorized if the user is not authenticated.
 * Returns a 500 Internal Server Error if there is an error in the GraphQL API.
 */
export const graphqlAPI = async (req: Request, res: Response) => {
  if (!(await isConnected)) {
    console.error('Mongo connection failed');
    return sendErrorResponse(res, { error: 'Server Error' });
  }

  console.log('graphql api starting');

  let ctx: APIContext;
  try {
    console.log('gathering user context');
    ctx = await createGraphQLContext(req);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, { error: 'Unauthorized' }, StatusCodes.Unauthorized);
  }

  try {
    const { query, variables } = assertAndFormatBody(req.body);
    return sendSuccessResponse(res, await graphQLHandler({ query, variables }, ctx));
  } catch (err) {
    console.log('error in graphql api');
    console.error(err);
    return sendErrorResponse(res, { error: 'Server Error' });
  }
};
