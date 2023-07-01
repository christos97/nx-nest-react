import { z } from 'zod';

export const AbortTransactionSchema = z.object({
  chartId: z.string(),
  name: z.string(),
});
