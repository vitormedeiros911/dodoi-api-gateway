import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { IUsuario } from '../../../dodoi-pedido-service/dist/shared/interfaces/usuario.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Refresh Token' })
  async refreshToken(@GetUsuario() usuario: IUsuario) {
    return this.authService.refreshToken(usuario.id);
  }
}
