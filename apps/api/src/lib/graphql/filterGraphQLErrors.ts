import { GraphQLError } from 'graphql';

/**
 * Filters the GraphQL errors and logs them to the console.
 *
 * This avoids leaking sensitive information to the client.
 */
export const filterGraphQLErrors = (err: GraphQLError) => {
  console.log('Unexpected graphql error');
  console.error(err);

  return new GraphQLError('Server error');
};
