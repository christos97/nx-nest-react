import { Schemas } from '@ntua-saas-10/shared-schemas';
import { createZodDto } from '@anatine/zod-nestjs';

export class RenderChartConfigRequestDto extends createZodDto(
  Schemas.ResourcesSchemas.renders.create,
) {}
