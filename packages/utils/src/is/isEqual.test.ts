import { describe, expect, test } from 'vitest';

import { isEqual } from './isEqual';

describe('isEqual', () => {
  test('arrays are equal', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [2, 1, 3])).toBe(false);
    expect(
      isEqual(
        { referrer: 'google.com', utm_term: 'abc' },
        { referrer: 'google.com', utm_term: 'abc' }
      )
    ).toBe(true);
    expect(
      isEqual(
        { referrer: 'google.com', utm_term: 'abc' },
        { utm_term: 'abc', referrer: 'google.com' }
      )
    ).toBe(true);
  });
});
