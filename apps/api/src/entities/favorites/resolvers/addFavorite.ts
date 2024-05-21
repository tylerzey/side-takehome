import type { MutationResolvers } from '../../../generated/resolvers';
import { toFavoriteId } from '../lib/toFavoriteId';

/**
 * To avoid a race condition of a user adding and removing a favorite in quick succession,
 * we are using the upsert option of the mongoose model to ensure that the favorite is only added if it does not exist.
 *
 * We are using a known id to push our "last write wins" to the database layer.
 */
export const addFavorite: MutationResolvers['addFavorite'] = async (_, args, ctx) => {
  const favorite = {
    userEmail: ctx.user.email,
    mlsId: args.mlsId,
    isFavorite: true,
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
