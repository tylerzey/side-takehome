import { assertValidQuery } from './assertValidQuery';
import { describe, expect, it } from 'vitest';

describe('assertValidQuery', () => {
  it('should throw an error if the query depth is above the limit', () => {
    const query = `
      query {
        user {
          posts {
            comments {
              replies {
                content
              }
            }
          }
        }
      }
    `;
    expect(() => assertValidQuery(query, 1)).toThrow('GraphQLDepthIsAboveLimit');
  });

  it('should throw an error if the query contains unused fragments', () => {
    const query = `
      query {
        user {
          id
        }
      }

      fragment UnusedFragment on User {
        name
      }
    `;
    expect(() => assertValidQuery(query)).toThrow('GraphQLQueryIsDisallowed');
  });

  it('should throw an error if the query contains unused variables', () => {
    const query = `
      query ($id: ID!, $unused: String) {
        user(id: $id) {
          name
        }
      }
    `;
    expect(() => assertValidQuery(query)).toThrow('GraphQLQueryIsDisallowed');
  });

  it('should not throw an error if the query is valid', () => {
    const query = `
      query {
        user {
          id
          name
        }
      }
    `;
    expect(() => assertValidQuery(query)).not.toThrow();
  });
});
