import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';

import { combinedResolversAndTypes } from '../../entities/combinedResolversAndTypes';
import { graphQLMiddleware } from '../middlewares/graphQLMiddleware';
import { directivesPrivate } from './directivePrivate';

let schema: GraphQLSchema | undefined;

const directives = [
  directivesPrivate,
  // add more directives here
];

const applyDirectives = (schema: GraphQLSchema) => {
  for (const directive of directives) {
    schema = directive(schema);
  }
  return schema;
};
/**
 * Creates the GraphQL schema for the API and applies the directives and middlewares to it.
 */
export const createAPISchema = (): GraphQLSchema => {
  if (schema) {
    return schema;
  }

  const { resolvers, typeDefs } = combinedResolversAndTypes();

  schema = applyDirectives(
    applyMiddleware(makeExecutableSchema({ resolvers, typeDefs }), ...graphQLMiddleware)
  );
  return schema;
};
