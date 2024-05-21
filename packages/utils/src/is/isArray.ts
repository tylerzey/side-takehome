/**
 * Asserts that the given value is an array.
 * @param input The value to assert is an array.
 * @returns True if the value is an array, false otherwise.
 */
export const isArray = <T, B>(input: T | readonly B[]): input is readonly B[] =>
  Array.isArray(input);
