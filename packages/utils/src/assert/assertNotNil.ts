import { isNull } from '../is/isNull';
import { isUndefined } from '../is/isUndefined';

type Assert = <T>(val: T | null | undefined, errMsg?: string) => asserts val is T;
/**
 * Asserts that the given value is not null or undefined.
 * @param val The value to assert is not null or undefined.
 * @param errMsg The error message to throw if the value is null or undefined.
 */
export const assertNotNil: Assert = (val, errMsg) => {
  if (isNull(val) || isUndefined(val)) {
    throw new Error(errMsg || 'ValueIsNil');
  }
};
