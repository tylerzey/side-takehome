import { userResolvers } from './users/userResolvers';
import { favoriteResolvers } from './favorites/favoriteResolvers';
import { resolvers as scalarResolvers } from 'graphql-scalars';
import { listingResolvers } from './listings/listingResolvers';
/**
 * A lookup of all the resolvers for the GraphQL API.
 */
export const resolverObjects = [
  scalarResolvers,
  listingResolvers,
  userResolvers,
  favoriteResolvers,
];
