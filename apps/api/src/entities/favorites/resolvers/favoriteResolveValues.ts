import type { FavoriteResolvedValuesResolvers } from '@api/generated/resolvers';
import type { APIContext } from '@api/lib/createGraphQLContext';
import { RequiredResolver } from '@api/lib/types';
import { FavoriteDB } from '../favoriteModel';

export const favoriteResolveValues: RequiredResolver<
  FavoriteResolvedValuesResolvers<APIContext, FavoriteDB>
> = {
  listing: async ({ mlsId }, args, ctx) => {
    return await ctx.loaders.findListingById.load(mlsId);
  },
};
