import { afterEach, describe, expect, test } from 'vitest';
import { graphQLSDK } from './lib/graphqlSDK';
import { users } from './lib/users';
import { listings } from './lib/listings';
import { Sdk } from './generated/sdk';
import { wait } from '@side/utils/src/lang/wait';

describe('favoriting', () => {
  const sdk = graphQLSDK(users.user1);
  const sdk2 = graphQLSDK(users.user2);

  afterEach(async () => {
    await cleanupFavorites(sdk);
    await cleanupFavorites(sdk2);
  });

  test(
    'a race condition should be avoided when adding and removing a favorite',
    async () => {
      const add1 = sdk.addFavorite({ mlsId: listings.one.mlsId });
      await wait(5);
      const rm = sdk.removeFavorite({ mlsId: listings.one.mlsId });
      await wait(50);
      const add2 = sdk.addFavorite({ mlsId: listings.one.mlsId });

      await Promise.all([add1, rm, add2]);
      const myFavorites = await sdk.queryMyFavorites();

      expect(myFavorites.data?.queryFavorites.entities).toMatchInlineSnapshot(`
      [
        {
          "mlsId": 1005192,
          "resolvedValues": {
            "listing": {
              "mlsId": 1005192,
            },
          },
        },
      ]
    `);
    },
    { retry: 3 }
  );

  test('should allow a user to favorite a listing', async () => {
    const res = await sdk.addFavorite({ mlsId: listings.one.mlsId });
    if (res.data?.addFavorite?.__typename !== 'Favorite') {
      throw new Error('Favorite not found');
    }

    expect(res.data?.addFavorite.mlsId).toEqual(listings.one.mlsId);
    const myFavorites = await sdk.queryMyFavorites();
    expect(myFavorites.data?.queryFavorites.entities).toMatchInlineSnapshot(`
      [
        {
          "mlsId": 1005192,
          "resolvedValues": {
            "listing": {
              "mlsId": 1005192,
            },
          },
        },
      ]
    `);
  });

  test('should allow a user to remove a favorite from a listing', async () => {
    await sdk.addFavorite({ mlsId: listings.one.mlsId });
    await sdk.removeFavorite({ mlsId: listings.one.mlsId });
    const myFavorites = await sdk.queryMyFavorites();

    expect(myFavorites.data?.queryFavorites.entities).toMatchInlineSnapshot(`[]`);
  });

  test('the listings favorite count remains accurate', async () => {
    await sdk.addFavorite({ mlsId: listings.one.mlsId });
    await sdk2.addFavorite({ mlsId: listings.one.mlsId });

    expect(await viewListingCount(sdk, listings.one.mlsId)).toBe(2);
    await sdk2.removeFavorite({ mlsId: listings.one.mlsId });
    expect(await viewListingCount(sdk, listings.one.mlsId)).toBe(1);
  });
});

const cleanupFavorites = async (sdk: Sdk) => {
  const myFavorites = await sdk.queryMyFavorites();
  for (const favorite of myFavorites.data?.queryFavorites.entities || []) {
    favorite?.mlsId && (await sdk.removeFavorite({ mlsId: favorite.mlsId }));
  }
};

const viewListingCount = async (sdk: Sdk, mlsId: number) => {
  const response = await sdk.viewListingFavoriteCount({ mlsId });
  if (response.data?.findListingById?.__typename === 'ErrorCause') {
    throw new Error('Listing not found');
  }
  return response.data?.findListingById?.resolvedValues?.favoritesCount;
};

/* GraphQL */ `
  query viewListingFavoriteCount($mlsId: Int!) {
    findListingById(mlsId: $mlsId) {
      ... on ErrorCause {
        __typename
        cause
      }
      # a complete listing request
      ... on Listing {
        __typename
        mlsId

        resolvedValues {
            favoritesCount
        }
      }
    }
  }
`;
/* GraphQL */ `
  query queryMyFavorites {
    queryFavorites {
      entities {
        mlsId

        resolvedValues { 
            listing { 
                mlsId
            }
        }
      }
    }
  }
`;
/* GraphQL */ `
  mutation addFavorite($mlsId: Int!) {
    addFavorite(mlsId: $mlsId) {
      ... on ErrorCause {
        cause
        __typename
      }
      ... on Favorite {
        mlsId
        __typename
      }
    }
  }
`;
/* GraphQL */ `
  mutation removeFavorite($mlsId: Int!) {
    removeFavorite(mlsId: $mlsId) {
      ... on ErrorCause {
        cause
        __typename
      }
      ... on Favorite {
        mlsId
        __typename
      }
    }
  }
`;
