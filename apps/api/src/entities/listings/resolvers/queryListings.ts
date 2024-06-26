import type { QueryResolvers } from '../../../generated/resolvers';

export const queryListings: QueryResolvers['queryListings'] = async (_, args, ctx) => {
  const listings = await ctx.loaders.queryListings.load({ cities: args.filter?.cities });

  listings.forEach((listing) => {
    ctx.assertCan('read', { ...listing, kind: 'listing' });
  });

  return {
    entities: listings,
    // Improve: Implement pagination
    hasMore: false,
  };
};
