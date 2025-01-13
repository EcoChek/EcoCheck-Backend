import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DBService } from '../../common/services/db.service';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { BcryptUtils } from '../../common/utils/bcrypt.utils';
import { RegisterDto } from './dto/register.dto';
import { users } from '../../database/schema/users';

@Injectable()
export class AuthService extends DBService {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async validateUser(
    email: string,
    password: string,
    pushToken: string
  ): Promise<{
    token: string;
  }> {
    const user = (
      await this.db.select().from(users).where(eq(users.email, email)).limit(1)
    )[0];

    if (user && (await BcryptUtils.comparePasswords(password, user.password))) {
      return {
        token: this.jwtService.sign({
          userID: user.id,
          pushToken
        })
      };
    }

    throw new UnauthorizedException('Incorrect email or password');
  }

  async register(registerDto: RegisterDto) {
    await this.db.insert(users).values({
      email: registerDto.email,
      password: await BcryptUtils.hashPassword(registerDto.password)
    });
  }
}
