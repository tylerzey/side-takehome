/**
 * Asserts that the given value is undefined.
 * @param value The value to assert is undefined.
 * @returns True if the value is undefined, false otherwise.
 */
export const isUndefined = (value: unknown): value is undefined => value === undefined;
