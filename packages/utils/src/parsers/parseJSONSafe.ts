/**
 * Parses the given value as JSON.
 */
export const parseJSONSafe = <T>(probablyJSON: unknown): T | undefined => {
  if (typeof probablyJSON !== 'string') {
    return undefined;
  }

  try {
    return JSON.parse(probablyJSON);
  } catch (_error) {
    //
    return undefined;
  }
};
