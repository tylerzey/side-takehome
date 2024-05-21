import type { IMiddlewareFunction } from 'graphql-middleware';

import type { APIContext } from '../createGraphQLContext';

export type Middleware = IMiddlewareFunction<any, APIContext>;
