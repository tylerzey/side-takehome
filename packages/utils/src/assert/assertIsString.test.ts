import { assertIsString } from '../assert/assertIsString';
import { describe, test, expect } from 'vitest';

describe('assertIsString', () => {
  test('should not throw an error if the value is a string', () => {
    expect(() => {
      assertIsString('hello');
    }).not.toThrow();
  });

  test('should throw an error if the value is not a string', () => {
    expect(() => {
      assertIsString(123);
    }).toThrow('ValueIsNotString');
  });

  test('should throw a custom error message if provided', () => {
    expect(() => {
      assertIsString(123, 'CustomErrorMessage');
    }).toThrow('CustomErrorMessage');
  });
});
