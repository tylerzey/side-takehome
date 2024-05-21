import { noopThrow } from './noopThrow';
import { describe, expect, test } from 'vitest';

describe('noopThrow', () => {
  test('should throw an error with the given name', () => {
    const errorName = 'TestError';
    const throwFunction = noopThrow(errorName);
    expect(throwFunction).toThrowError(errorName);
  });
});
