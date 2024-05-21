import { describe, expect, test } from 'vitest';

import { isNull } from './isNull';

describe('isNull', () => {
  test('default case', () => {
    let name;

    expect(isNull(name)).toEqual(false);
    expect(isNull(1)).toEqual(false);
    expect(isNull(undefined)).toEqual(false);
    // @ts-expect-error testing
    expect(isNull()).toEqual(false);
    expect(isNull(null)).toEqual(true);
    expect(isNull(null)).toEqual(true);
  });
});
