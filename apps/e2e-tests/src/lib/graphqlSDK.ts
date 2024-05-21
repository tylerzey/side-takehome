import { DocumentNode, print } from 'graphql';
import { getSdk } from '../generated/sdk';
import type { Requester } from '../generated/sdk';
import axios from 'axios';

type UserAuth = { email: string; password: string };

export const createRequester =
  (authorizer: UserAuth) =>
  async <V extends Record<string, any> | undefined>(query: DocumentNode, variables: V) => {
    const res = await axios.post(
      'http://localhost:4000/graphql',
      { query: print(query), variables },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${authorizer.email}:${authorizer.password}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  };

export const graphQLSDK = (req: UserAuth) => {
  return getSdk(createRequester(req) as Requester);
};
