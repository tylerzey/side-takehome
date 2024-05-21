import { uuid } from '../lang/uuid';
import { isValidUUID } from './isValidUUID';
import { describe, expect, test } from 'vitest';

describe('isValidUUID', () => {
  test('should return true for a valid UUID', () => {
    expect(isValidUUID(uuid())).toBe(true);
  });

  test('should return false for an invalid UUID', () => {
    expect(isValidUUID('not-a-valid-uuid')).toBe(false);
  });

  test('should return false for a non-string value', () => {
    expect(isValidUUID(123)).toBe(false);
    expect(isValidUUID(null)).toBe(false);
    expect(isValidUUID(undefined)).toBe(false);
    expect(isValidUUID({})).toBe(false);
    expect(isValidUUID([])).toBe(false);
    expect(isValidUUID(true)).toBe(false);
    expect(isValidUUID(false)).toBe(false);
  });
});
