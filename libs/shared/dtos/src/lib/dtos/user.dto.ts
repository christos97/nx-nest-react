import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { ResourcePath } from '@ntua-saas-10/shared-api-interfaces';
import { ResourcesSchemas } from '@ntua-saas-10/shared-schemas';

const resourceName = 'User';
const resourcePath: ResourcePath = 'users';

const { retrieve, list, create, update } = ResourcesSchemas[ResourcePath[resourcePath]];

export const UserZ = extendApi(retrieve, {
  title: resourceName,
  description: `Retrieve a ${resourceName}`,
});
export const GetUsersZ = extendApi(list, {
  title: `List${resourceName}s`,
  description: `List all ${resourceName}s`,
  type: 'array',
});
export const CreateUserZ = extendApi(create, {
  title: `Create${resourceName}`,
  description: `Create a ${resourceName}`,
});
export const UpdateUserZ = extendApi(update, {
  title: `Update${resourceName}`,
  description: `Update a ${resourceName}`,
});

export class UserDto extends createZodDto(UserZ) {}
export class GetUsersDto extends createZodDto(GetUsersZ) {}
export class CreateUserDto extends createZodDto(CreateUserZ) {}
export class UpdateUserDto extends createZodDto(UpdateUserZ) {}
