import type { ExecutionResult } from 'graphql';
import { graphql } from 'graphql';

import type { APIContext } from '../createGraphQLContext';

import { createAPISchema } from './createAPISchema';
import { filterGraphQLErrors } from './filterGraphQLErrors';

type GraphQLType = { query: string; variables?: Record<string, any> | undefined };
export const graphQLHandler = async (
  args: GraphQLType,
  graphQLContext: APIContext
): Promise<ExecutionResult<any, any>> => {
  const response = await graphql({
    contextValue: graphQLContext,
    rootValue: {},
    schema: createAPISchema(),
    source: args.query,
    variableValues: args.variables,
  });

  return { ...response, errors: response.errors?.map(filterGraphQLErrors) };
};
