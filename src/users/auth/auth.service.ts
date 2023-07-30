import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length > 0) {
      throw new BadRequestException('User already exists');
    }
  }

  signIn(email: string, password: string) {}
}