import { validate, version } from 'uuid';
import { isString } from './isString';
/**
 * Asserts that the given value is a valid UUID.
 * @param str The value to assert is a valid UUID.
 * @returns True if the value is a valid UUID, false otherwise.
 */
export const isValidUUID = (str: unknown): str is string => {
  return isString(str) && validate(str) && version(str) === 4;
};
