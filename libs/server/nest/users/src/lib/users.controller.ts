import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Body, Controller, Get, Param, Patch, Post, Delete, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserDto, GetUsersDto, CreateUserDto, UpdateUserDto } from '@ntua-saas-10/shared-dtos';
import { User } from '@ntua-saas-10/shared-types';

import { UsersService } from './users.service';

interface ResourceDeleted {
  id: string;
  deleted: boolean;
}

@Controller('users')
@UsePipes(ZodValidationPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiCreatedResponse({
    type: GetUsersDto,
  })
  async list(): Promise<User[]> {
    return await this.usersService.list();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: CreateUserDto,
  })
  async retrieve(@Param('id') id: string): Promise<User> {
    return await this.usersService.retrieve(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: UserDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: UpdateUserDto,
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    type: UserDto,
  })
  async remove(@Param('id') id: string): Promise<ResourceDeleted> {
    const deleted = await this.usersService.remove(id);
    return { id, deleted };
  }
}
