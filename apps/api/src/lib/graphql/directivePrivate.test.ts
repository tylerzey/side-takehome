import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';
import { describe, expect, test } from 'vitest';

import { directivesPrivate, privateDirective } from './directivePrivate';

describe('private directive', () => {
  const testSchema = /* GraphQL */ `
    type Query {
      privateField: String @private
      publicField: String
    }
  `;
  const privateField = 'PRIVATE';
  const publicField = 'PUBLIC';

  const schema = directivesPrivate(
    makeExecutableSchema({
      resolvers: { Query: { privateField: () => privateField, publicField: () => publicField } },
      typeDefs: [privateDirective, testSchema],
    })
  );

  test('query without private are not affected', async () => {
    const response = await graphql({
      schema,
      source: `query { publicField }`,
      variableValues: {},
    });
    expect(response.errors).toEqual(undefined);
    expect(response.data?.publicField).toBe(publicField);
  });
  test('query with private are private', async () => {
    const response = await graphql({
      schema,
      source: `query { privateField }`,
      variableValues: {},
    });
    expect(response.errors).toEqual(undefined);
    expect(response.data?.privateField).toBeNull();
  });
});
