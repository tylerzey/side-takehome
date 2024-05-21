import { resolvedValues } from '@api/lib/graphql/resolvedValues';
import type { Resolvers } from '@api/generated/resolvers';
import { queryFavorites } from './resolvers/queryFavorites';
import { addFavorite } from './resolvers/addFavorite';
import { removeFavorite } from './resolvers/removeFavorite';
import { toErrIfCause } from '@api/lib/graphql/toErrIfCause';
import { favoriteResolveValues } from './resolvers/favoriteResolveValues';

export const favoriteResolvers: Resolvers = {
  Mutation: {
    addFavorite,
    removeFavorite,
  },
  Favorite: {
    resolvedValues,
  },
  FavoriteResponse: { __resolveType: toErrIfCause('Favorite') },
  FavoriteResolvedValues: favoriteResolveValues as Resolvers['FavoriteResolvedValues'],
  Query: {
    queryFavorites,
  },
};
