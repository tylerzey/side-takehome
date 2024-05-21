import { wait } from './wait';
import { describe, expect, test } from 'vitest';

describe('wait', () => {
  test('should wait for the given number of milliseconds', async () => {
    const start = Date.now();
    const ms = 1000;
    await wait(ms);
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(ms);
  });
});
