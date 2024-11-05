import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { IUsuario } from '../shared/interfaces/usuario.interface';
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
      this.clientUsuarioBackend.send('buscar-usuario', {
        email,
      }),
    );

    if (!usuario)
      await firstValueFrom(
        this.clientUsuarioBackend
          .send(
            'criar-usuario',
            new CriarUsuarioDto({
              email,
              nome: tokenDecoded.name,
              urlImagem: tokenDecoded.picture,
            }),
          )
          .pipe(
            catchError((error) =>
              throwError(() => new HttpException(error.response, error.status)),
            ),
          ),
      );

    const access_token = this.jwtService.sign({
      ...usuario,
    });

    return {
      access_token,
    };
  }
}
