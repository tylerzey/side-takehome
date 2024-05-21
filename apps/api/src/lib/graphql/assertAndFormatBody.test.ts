import { assertAndFormatBody } from './assertAndFormatBody';
import { describe, expect, it } from 'vitest';
describe('assertAndFormatBody', () => {
  it('should throw an error if the body is missing', () => {
    expect(() => assertAndFormatBody(undefined)).toThrow('missing body');
  });

  it('should throw an error if the body is not a valid GraphQL request', () => {
    const invalidBody = {
      operationName: 'getUser',
      variables: {},
    };
    expect(() => assertAndFormatBody(invalidBody)).toThrow();
  });

  it('should not throw an error if the body is a valid GraphQL request', () => {
    const body = {
      operationName: 'getUser',
      query: `
        query {
          user {
            id
            name
          }
        }
      `,
      variables: {},
    };
    expect(() => assertAndFormatBody(body)).not.toThrow();
  });
});
