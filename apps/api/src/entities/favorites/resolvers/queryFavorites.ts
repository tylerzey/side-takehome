import type { QueryResolvers } from '../../../generated/resolvers';

export const queryFavorites: QueryResolvers['queryFavorites'] = async (_, args, ctx) => {
  const favorites = await ctx.loaders.queryFavoritesByUserEmail.load(ctx.user.email);

  favorites.forEach((favorite) => {
    ctx.assertCan('read', { ...favorite, kind: 'favorite' });
  });

  return {
    entities: favorites,
    // Improve: Implement pagination
    hasMore: false,
  };
};
