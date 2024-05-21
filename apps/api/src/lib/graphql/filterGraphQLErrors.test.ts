import { GraphQLError } from 'graphql';
import { describe, expect, test } from 'vitest';

import { filterGraphQLErrors } from './filterGraphQLErrors';

describe('filterGraphQLErrors', () => {
  test('white listed user errors', () => {
    const err = new GraphQLError('', { originalError: new Error('testing') });

    expect(filterGraphQLErrors(err)).toEqual(new GraphQLError('Server error'));
  });
});
