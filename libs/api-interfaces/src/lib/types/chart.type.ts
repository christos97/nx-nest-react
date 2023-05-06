import { z } from 'zod';
import { ChartTypeSchema } from '../schemas/datafiles.schemas';

export type ChartType = z.infer<typeof ChartTypeSchema>;
