import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { loginDTO } from './login-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //Login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: loginDTO) {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }

    //Placeholderfunktion für Rückgabe des derzeiten Users
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
