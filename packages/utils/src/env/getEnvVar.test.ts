import { getEnvVar } from './getEnvVar';
import { vi, describe, beforeEach, test, expect } from 'vitest';

describe('getEnvVar', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  test('should return the value of an existing environment variable', () => {
    process.env.MY_VARIABLE = 'my value';
    expect(getEnvVar('MY_VARIABLE')).toBe('my value');
  });

  test('should throw an error for an undefined environment variable', () => {
    expect(() => {
      getEnvVar('UNDEFINED_VARIABLE');
    }).toThrowError('Env var is undefined: UNDEFINED_VARIABLE');
  });
});
