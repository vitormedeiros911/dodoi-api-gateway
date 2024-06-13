import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { IUsuario } from '../shared/interface/usuario.interface';
import { LoginDto } from './dto/login.dto';
import { IGoogleIdToken } from './interface/google-id-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxyService: ClientProxyService,
    private readonly jwtService: JwtService,
  ) {}

  private clientUsuarioBackend =
    this.clientProxyService.getClientProxyUsuarioServiceInstance();

  async login(loginDto: LoginDto) {
    const tokenDecoded: IGoogleIdToken = this.jwtService.decode(
      loginDto.idToken,
    );

    const email = tokenDecoded.email;

    const usuario: IUsuario = await firstValueFrom(
      this.clientUsuarioBackend.send('buscar-usuario-para-autenticacao', {
        email,
      }),
    );

    if (!usuario) throw new UnauthorizedException('Email inválido');

    const token = this.jwtService.sign({
      ...usuario,
    });

    return {
      token,
    };
  }
}
