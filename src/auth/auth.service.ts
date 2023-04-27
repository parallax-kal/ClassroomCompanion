import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    const foundUser = await this.validateUser(user.username, user.password);
    const payload: JwtPayload = {
      username: foundUser.username,
      sub: foundUser.id,
      role: foundUser.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
