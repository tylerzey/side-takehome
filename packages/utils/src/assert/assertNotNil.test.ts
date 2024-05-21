import { assertNotNil } from '../assert/assertNotNil';
import { describe, test, expect } from 'vitest';

describe('assertNotNil', () => {
  test('should not throw an error if the value is not null or undefined', () => {
    expect(() => {
      assertNotNil('hello', 'CustomErrorMessage');
    }).not.toThrow();
  });

  test('should throw an error if the value is null', () => {
    expect(() => {
      assertNotNil(null, 'CustomErrorMessage');
    }).toThrow('CustomErrorMessage');
  });

  test('should throw an error if the value is undefined', () => {
    expect(() => {
      assertNotNil(undefined, 'CustomErrorMessage');
    }).toThrow('CustomErrorMessage');
  });

  test('should throw a default error message if no error message is provided', () => {
    expect(() => {
      assertNotNil(null);
    }).toThrow('ValueIsNil');
  });
});
