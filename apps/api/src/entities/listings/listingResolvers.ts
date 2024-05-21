import { resolvedValues } from '@api/lib/graphql/resolvedValues';
import type { Resolvers } from '@api/generated/resolvers';
import { listingResolvedValues } from './resolvers/listingResolvedValues';
import { queryListings } from './resolvers/queryListings';
import { findListingById } from './resolvers/findListingById';
import { toErrIfCause } from '@api/lib/graphql/toErrIfCause';

export const listingResolvers: Resolvers = {
  Mutation: {},
  Query: {
    findListingById,
    queryListings,
  },
  ListingResponse: {
    __resolveType: toErrIfCause('Listing'),
  },
  Listing: {
    resolvedValues,
  },
  ListingResolvedValues: listingResolvedValues as Resolvers['ListingResolvedValues'],
};
