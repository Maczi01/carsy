import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const createdUser = this.usersRepository.create({ email, password });
    return this.usersRepository.save(createdUser);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    console.log({ user });
    if (!user || !id) {
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
