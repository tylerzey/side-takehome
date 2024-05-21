import { wait } from './wait';

type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

interface Options {
  batchSize?: number;
  delayMS?: number;
}

/**
 * Batches the given data and calls the given function for each item in the batch.
 * Note: This does not implement a try/catch intentionally. That should be handled by the outer scope in case
 * the consumer wants to bail out by throwing
 */
export const batchedForLoop = async <T, TFunc extends (args: T, idx: number) => Promise<any>>(
  data: readonly T[],
  fn: TFunc,
  options?: Options
): Promise<ReturnPromiseType<TFunc>[]> => {
  const results = [] as any[];
  const batchSize = options?.batchSize || 2;
  const delayMS = options?.delayMS || 100;

  for (let i = 0; i < data.length; i += batchSize) {
    const concurrentSubset = data.slice(i, i + batchSize);

    await Promise.all(
      concurrentSubset.map(async (item, idx) => {
        const res = await fn(item, idx + i);
        results[i + idx] = res;
      })
    );

    if (delayMS) {
      await wait(delayMS);
    }
  }

  return results;
};
