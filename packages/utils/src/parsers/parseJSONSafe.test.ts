import { test, expect, describe } from 'vitest';
import { parseJSONSafe } from './parseJSONSafe';

describe('parseJSONSafe', () => {
  test('should return undefined for non-string input', () => {
    expect(parseJSONSafe(123)).toBeUndefined();
    expect(parseJSONSafe(null)).toBeUndefined();
    expect(parseJSONSafe(undefined)).toBeUndefined();
    expect(parseJSONSafe({})).toBeUndefined();
    expect(parseJSONSafe([])).toBeUndefined();
    expect(parseJSONSafe(true)).toBeUndefined();
  });

  test('should return undefined for invalid JSON string', () => {
    expect(parseJSONSafe('')).toBeUndefined();
    expect(parseJSONSafe('not a JSON string')).toBeUndefined();
    expect(parseJSONSafe('{"name": "John", "age": 30,}')).toBeUndefined();
    expect(parseJSONSafe('{"name": "John", "age": 30')).toBeUndefined();
  });

  test('should return parsed JSON object for valid JSON string', () => {
    expect(parseJSONSafe('{"name": "John", "age": 30}')).toEqual({ name: 'John', age: 30 });
    expect(parseJSONSafe('{"key": "value"}')).toEqual({ key: 'value' });
    expect(parseJSONSafe('{"array": [1, 2, 3]}')).toEqual({ array: [1, 2, 3] });
  });
});
