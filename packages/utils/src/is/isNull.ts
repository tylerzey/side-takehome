/**
 * Asserts that the given value is null.
 * @param value The value to assert is null.
 * @returns True if the value is null, false otherwise.
 */
export const isNull = (value: unknown): value is null => value === null;
