import { Injectable } from '@nestjs/common';
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
    return this.usersRepository.findOneBy({ id });
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
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    Object.assign(userToUpdate, body);
    return this.usersRepository.save(userToUpdate);
  }

  async remove(id: number) {
    const userToRemove = await this.findOne(id);
    if (!userToRemove) {
      throw new Error('User not found');
    }
    return this.usersRepository.remove(userToRemove);
  }
}
