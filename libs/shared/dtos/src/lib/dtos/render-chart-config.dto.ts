import { createZodDto } from '@anatine/zod-nestjs';
import { Schemas } from '@ntua-saas-10/shared-schemas';

export class RenderChartConfigRequestDto extends createZodDto(
  Schemas.ResourcesSchemas.renders.create,
) {}
