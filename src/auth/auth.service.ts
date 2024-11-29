import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom, throwError } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { StatusEnum } from '../shared/enum/status.enum';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { CriarUsuarioDto } from '../usuario/dto/criar-usuario.dto';
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

    let usuario: IUsuario = await firstValueFrom(
      this.clientUsuarioBackend.send('buscar-usuario', {
        email,
        status: ['ATIVO', 'INATIVO'],
      }),
    );

    let primeiroAcesso = false;
    if (!usuario) {
      usuario = await firstValueFrom(
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

      primeiroAcesso = true;
    }

    if (usuario.status === StatusEnum.INATIVO)
      return {
        usuario,
        primeiroAcesso,
      };

    const access_token = this.jwtService.sign({
      id: usuario.id,
      email: usuario,
      nome: usuario.nome,
      urlImagem: usuario.urlImagem,
      perfis: usuario.perfis,
      idFarmacia: usuario.idFarmacia,
    });

    return {
      usuario,
      primeiroAcesso,
      access_token,
    };
  }
}
