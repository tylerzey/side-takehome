/**
 * Asserts that the given value is a boolean.
 * @param value The value to assert is a boolean.
 * @returns True if the value is a boolean, false otherwise.
 */
export const isBoolean = (value: unknown): value is boolean => {
  const type = typeof value;
  return type === 'boolean';
};
