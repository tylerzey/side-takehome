import { isUndefined } from '../is/isUndefined';

/**
 * Returns an env var or throws if it is undefined
 */
export const getEnvVar = (key: string): string => {
  const value = process.env[key];

  if (isUndefined(value)) {
    throw new Error(`Env var is undefined: ${key}`);
  }

  return value;
};
