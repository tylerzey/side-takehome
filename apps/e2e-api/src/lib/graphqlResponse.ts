import { z } from 'zod';

export const responseBody = z.object({ body: z.string() });
