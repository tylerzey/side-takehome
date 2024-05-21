import { describe, expect, it, vi } from 'vitest';

import { batchedForLoop } from './batchedForLoop';

describe('batchedForLoop', () => {
  it('should process data in batches and return results', async () => {
    const data = [1, 2, 3, 4, 5];
    const fn = vi.fn((item: number) => Promise.resolve(item * 2));
    const options = { batchSize: 2, delayMS: 100 };

    const result = await batchedForLoop(data, fn, options);

    expect(result).toEqual([2, 4, 6, 8, 10]);
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenNthCalledWith(1, 1, 0);
    expect(fn).toHaveBeenNthCalledWith(2, 2, 1);
    expect(fn).toHaveBeenNthCalledWith(3, 3, 2);
    expect(fn).toHaveBeenNthCalledWith(4, 4, 3);
    expect(fn).toHaveBeenNthCalledWith(5, 5, 4);
  });

  it('should process data in default batch size and delay', async () => {
    const data = [1, 2, 3];
    const fn = vi.fn((item: number) => Promise.resolve(item * 3));

    const result = await batchedForLoop(data, fn);

    expect(result).toEqual([3, 6, 9]);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenNthCalledWith(1, 1, 0);
    expect(fn).toHaveBeenNthCalledWith(2, 2, 1);
    expect(fn).toHaveBeenNthCalledWith(3, 3, 2);
  });
});
