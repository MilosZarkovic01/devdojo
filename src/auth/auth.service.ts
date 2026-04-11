import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    let user: User;

    try {
      user = await this.userService.findOne(email);
    } catch (e) {
      throw new UnauthorizedException();
    }

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }
}
