import type { MutationResolvers } from '../../../generated/resolvers';
import { toFavoriteId } from '../lib/toFavoriteId';

/**
 * To avoid the race condition of adding and removing a favorite at the same time,
 * we are using the upsert option of the mongoose model to ensure that the favorite is only added if it does not exist.
 *
 * Last write wins.
 */
export const removeFavorite: MutationResolvers['removeFavorite'] = async (_, args, ctx) => {
  const favorite = {
    userEmail: ctx.user.email,
    mlsId: args.mlsId,
    isFavorite: false,
  };

  ctx.assertCan('create', { ...favorite, kind: 'favorite' });

  const listing = await ctx.loaders.findListingById.load(args.mlsId);

  if (!listing) {
    return { cause: `Listing with mlsId ${args.mlsId} not found` };
  }

  return await ctx.models.favoriteModel.findByIdAndUpdate(
    toFavoriteId(ctx.user.email, args.mlsId),
    favorite,
    {
      upsert: true,
      new: true,
    }
  );
};
