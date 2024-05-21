/**
 * Asserts that the given value is a string.
 * @param value The value to assert is a string.
 * @returns True if the value is a string, false otherwise.
 */
export const isString = (value: unknown): value is string => typeof value === 'string';
