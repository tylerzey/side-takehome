import { merge } from './merge';
import { describe, expect, test } from 'vitest';

describe('merge', () => {
  test('should merge two objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const merged = merge(obj1, obj2);
    expect(merged).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  test('should merge nested objects', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { c: 2 } };
    const merged = merge(obj1, obj2);
    expect(merged).toEqual({ a: { b: 1, c: 2 } });
  });

  test('should overwrite properties with the same key', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const merged = merge(obj1, obj2);
    expect(merged).toEqual({ a: 1, b: 3, c: 4 });
  });
});
