import { z } from 'zod';

import { assertValidQuery } from './assertValidQuery';

const graphQLRequest = z.object({
  operationName: z.string().optional(),
  query: z.string(),
  variables: z.any().optional(),
});

type GraphQLRequest = z.infer<typeof graphQLRequest>;
/**
 * Asserts that the given body is a valid GraphQL query and does not violate our
 * query depth limits. Or requests an introspection GraphQL query in production.
 */
export const assertAndFormatBody = (body: unknown): GraphQLRequest => {
  if (!body) {
    throw new Error('missing body');
  }

  const { operationName, variables, query } = graphQLRequest.parse(body);
  console.log('operationName', operationName);
  console.log('query', query);
  console.log('variables', variables);

  assertValidQuery(query);

  return { operationName, query, variables };
};
