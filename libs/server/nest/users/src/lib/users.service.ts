import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from '@ntua-saas-10/shared-dtos';
import { User } from '@ntua-saas-10/shared-types';
import { Model } from 'mongoose';

import { UserDocument } from './user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly userRepository!: UserRepository;
  constructor(@InjectModel(UsersService.name) userModel: Model<UserDocument>) {
    if (!this.userRepository) {
      this.userRepository = new UserRepository(userModel);
    }
  }

  async list(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async retrieve(id: string): Promise<User> {
    return await this.userRepository.findOne({ uid: id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.findOneAndUpdate({ uid: id }, updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.userRepository.findOneAndUpdate({ uid: id }, { deleted: true });
    return res.$isDeleted();
  }
}
