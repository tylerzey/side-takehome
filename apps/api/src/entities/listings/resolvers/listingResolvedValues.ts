import type { Listing, ListingResolvedValuesResolvers } from '@api/generated/resolvers';
import type { APIContext } from '@api/lib/createGraphQLContext';
import { RequiredResolver } from '@api/lib/types';
import { assertNotNil } from '@side/utils/src/assert/assertNotNil';

export const listingResolvedValues: RequiredResolver<
  ListingResolvedValuesResolvers<APIContext, Omit<Listing, 'resolvedValue'>>
> = {
  favoritesCount: async ({ mlsId }, args, ctx) => {
    assertNotNil(mlsId, 'MLS Id is missing for listing');

    return await ctx.loaders.countFavoritesByMLSId.load(mlsId);
  },
};
