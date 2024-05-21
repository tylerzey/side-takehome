import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

/**
 * Asserts that the given value is null or undefined.
 */
export const isNil = <T>(value: T | undefined | null): value is undefined | null =>
  isNull(value) || isUndefined(value);
