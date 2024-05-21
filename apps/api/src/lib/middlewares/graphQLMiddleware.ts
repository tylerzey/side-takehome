import type { IMiddleware } from 'graphql-middleware/dist/types';

import { loggerMiddleware } from './loggerMiddleware';

/**
 * A collection of all the middlewares for the GraphQL API.
 */
export const graphQLMiddleware: IMiddleware[] = [
  loggerMiddleware,
  // add more middlewares here
];
