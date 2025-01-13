import {
    Body,
    Controller,
    HttpCode,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @ApiOperation({
        description:
            'Performs authentication and returns a JWT token if successful',
        summary: 'Login'
    })
    async organizationLogin(@Request() req: any) {
        return req.user;
    }

    @Post('register')
    @Public()
    @HttpCode(200)
    @ApiOperation({
        description: 'Verifies email uniqueness and creates an account',
        summary: 'Register'
    })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
