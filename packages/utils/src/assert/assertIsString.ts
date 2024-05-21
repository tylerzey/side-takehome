import { isString } from '../is/isString';

type Assert = (str: unknown, errorMsg?: string) => asserts str is string;

/**
 * Asserts that the given value is a string.
 * @param str The value to assert is a string.
 * @param errorMsg The error message to throw if the value is not a string.
 */
export const assertIsString: Assert = (str, errorMsg) => {
  if (!isString(str)) {
    throw new Error(errorMsg || 'ValueIsNotString');
  }
};
