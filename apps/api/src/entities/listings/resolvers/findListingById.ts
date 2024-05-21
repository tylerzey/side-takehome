import type { QueryResolvers } from '../../../generated/resolvers';

export const findListingById: QueryResolvers['findListingById'] = async (_, args, ctx) => {
  const listing = await ctx.loaders.findListingById.load(args.mlsId);

  if (!listing) {
    return { cause: 'Listing not found' };
  }

  if (ctx.ability.cannot('read', { ...listing, kind: 'listing' })) {
    return { cause: 'Unauthorized' };
  }

  return listing;
};
