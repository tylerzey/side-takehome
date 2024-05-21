/**
 * A no-op function that throws an error.
 * @param name The name of the error to throw.
 * @returns A function that throws an error.
 */
export const noopThrow = (name: string) => () => {
  throw new Error(name);
};
