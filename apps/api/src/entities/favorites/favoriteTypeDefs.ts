export const favoriteTypeDefs = /* GraphQL */ `
  extend type Query {
    """
    Query favorites based on a filter
    """
    queryFavorites: QueryFavoritesResponse!
  }

  type QueryFavoritesResponse {
    entities: [Favorite]
    hasMore: Boolean
  }

  extend type Mutation {
    addFavorite(mlsId: Int!): FavoriteResponse!
    removeFavorite(mlsId: Int!): FavoriteResponse!
  }

  union FavoriteResponse = Favorite | ErrorCause

  type Favorite {
    _id: String!
    mlsId: Int!
    userEmail: EmailAddress!
    isFavorite: Boolean!

    resolvedValues: FavoriteResolvedValues
  }

  type FavoriteResolvedValues {
    listing: Listing
  }
`;
