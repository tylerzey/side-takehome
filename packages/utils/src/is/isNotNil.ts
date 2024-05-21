import { isNil } from './isNil';

/**
 * Asserts that the given value is not null or undefined.
 * @param value The value to assert is not null or undefined.
 * @returns True if the value is not null or undefined, false otherwise.
 */
export const isNotNil = <T>(value: T | undefined | null): value is T => !isNil(value);
