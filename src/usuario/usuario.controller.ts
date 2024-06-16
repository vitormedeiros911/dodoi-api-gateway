import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { catchError, throwError } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

@ApiTags('Usuário')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly clientProxyService: ClientProxyService) {}

  private clientUsuarioBackend =
    this.clientProxyService.getClientProxyUsuarioServiceInstance();

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiBadRequestResponse({ description: 'Usuário já cadastrado.' })
  async criarUsuario(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.clientUsuarioBackend
      .send('criar-usuario', criarUsuarioDto)
      .pipe(
        catchError((error) =>
          throwError(() => new HttpException(error.response, error.status)),
        ),
      );
  }
}
