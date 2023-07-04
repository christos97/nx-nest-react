import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { ResourcePath } from '@ntua-saas-10/shared-api-interfaces';
import { ResourcesSchemas } from '@ntua-saas-10/shared-schemas';
import { ZodObject, ZodRawShape } from 'zod';

export function createResourceSchemaAndDto(resourceName: string, resourcePath: ResourcePath) {
  const { retrieve, list, create, update } = ResourcesSchemas[ResourcePath[resourcePath]];

  const ResourceZ = extendApi(retrieve, {
    title: resourceName,
    description: `Retrieve a ${resourceName}`,
  });
  const GetResourcesZ = extendApi(list, {
    title: `List${resourceName}s`,
    description: `List all ${resourceName}s`,
    type: 'array',
  });
  const CreateResourceZ = extendApi(create, {
    title: `Create${resourceName}`,
    description: `Create a ${resourceName}`,
  });
  const UpdateResourceZ = extendApi(update, {
    title: `Update${resourceName}`,
    description: `Update a ${resourceName}`,
  });

  return {
    [`${resourceName}Z`]: ResourceZ,
    [`Get${resourceName}sZ`]: GetResourcesZ,
    [`Create${resourceName}Z`]: CreateResourceZ,
    [`Update${resourceName}Z`]: UpdateResourceZ,
    [`${resourceName}Dto`]: createZodDto(ResourceZ),
    [`Get${resourceName}sDto`]: createZodDto(GetResourcesZ),
    [`Create${resourceName}Dto`]: createZodDto(CreateResourceZ),
    [`Update${resourceName}Dto`]: createZodDto(UpdateResourceZ),
  };
}
