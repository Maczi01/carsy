import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(createdUser);
  }

  findOne(id: number) {
    const user = this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  find(email: string) {
    return this.usersRepository.find({
      where: {
        email,
      },
    });
  }

  async update(id: number, body: Partial<User>) {
    const userToUpdate = await this.findOne(id);
    Object.assign(userToUpdate, body);
    return this.usersRepository.save(userToUpdate);
  }

  async remove(id: number) {
    const userToRemove = await this.findOne(id);
    return this.usersRepository.remove(userToRemove);
  }
}