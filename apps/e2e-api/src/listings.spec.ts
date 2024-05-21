import { describe, expect, test } from 'vitest';

import { graphQLSDK } from './lib/graphqlSDK';
import { users } from './lib/users';

describe('listings graphql', async () => {
  test('Listing is not found', async () => {
    const sdk = graphQLSDK(users.user1);
    const res = await sdk.viewListingTest({ mlsId: 100 });
    expect(res.data?.findListingById).toEqual({
      __typename: 'ErrorCause',
      cause: 'Listing not found',
    });
  });

  test('Listing is found', async () => {
    const sdk = graphQLSDK(users.user1);
    const res = await sdk.viewListingTest({ mlsId: 1005221 });
    if (res.data?.findListingById?.__typename !== 'Listing') {
      throw new Error('Listing not found');
    }

    expect(res.data?.findListingById?.terms).toEqual('FHA,VA');
    expect(res.data?.findListingById?.listPrice).toEqual(9375751);
    expect(res.data?.findListingById?.listDate).toEqual('1994-10-25T13:58:17.284009Z');
  });
});

/* GraphQL */ `
  query viewListingTest($mlsId: Int!) {
    findListingById(mlsId: $mlsId) {
      ... on ErrorCause {
        __typename
        cause
      }
      # a complete listing request
      ... on Listing {
        __typename
        mlsId
        privateRemarks
        showingContactName
        showingContactPhone
        terms
        showingInstructions
        leaseTerm
        disclaimer
        originalListPrice
        agreement
        listDate
        modified
        listPrice
        internetAddressDisplay
        listingId
        internetEntireListingDisplay
        leaseType
        virtualTourUrl
        remarks
        association {
          frequency
          fee
          name
          amenities
        }
        sales {
         closeDate
          closePrice
          contractDate
          agent {
            lastName
            contact {
              email
              office
              cell
            }
            address
            firstName
            id
          }
          office {
            name
            contact {
              email
              office
              cell
            }
          }
        }
      }
    }
  }
`;
