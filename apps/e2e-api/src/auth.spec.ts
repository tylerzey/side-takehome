import { describe, expect, test } from 'vitest';
import { createRequester, graphQLSDK } from './lib/graphqlSDK';
import { users } from './lib/users';
import { parse } from 'graphql';

describe('auth', () => {
  test('Invalid auth', async () => {
    const sdk = graphQLSDK(users.invalid);
    await expect(
      async () => await sdk.viewListingTest({ mlsId: 1005221 })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[AxiosError: Request failed with status code 401]`
    );
  });

  test('Invalid graphql - errors are scrubbed and a response is returned', async () => {
    const query = 'query {invalidQuery}';
    const documentNode = parse(query);
    const res = await createRequester(users.user1)(documentNode, { one: 1 });
    expect(res).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "message": "Server error",
          },
        ],
      }
    `);
  });
});
