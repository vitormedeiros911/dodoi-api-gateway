import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { IUsuario } from '../shared/interfaces/usuario.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private clientProxyService: ClientProxyService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private clientUsuarioBackend =
    this.clientProxyService.getClientProxyUsuarioServiceInstance();

  async validate(payload: IUsuario): Promise<IUsuario> {
    const { id } = payload;

    const usuario: IUsuario = await firstValueFrom(
      this.clientUsuarioBackend.send('buscar-usuario-para-autenticacao', {
        id,
      }),
    );

    if (!usuario) throw new UnauthorizedException('Usuário não encontrado');

    return payload;
  }
}
