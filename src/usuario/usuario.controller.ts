import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { catchError, throwError } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
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

  @Get('/perfil')
  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Buscar perfil de usuário' })
  async buscarPerfilUsuario(@GetUsuario() usuario: IUsuario) {
    return this.clientUsuarioBackend.send('buscar-perfil-usuario', usuario.id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Atualizar usuário' })
  atualizarUsuario(
    @GetUsuario() usuario: IUsuario,
    @Body() atualizarUsuarioDto: AtualizarUsuarioDto,
  ) {
    this.clientUsuarioBackend.emit('atualizar-usuario', {
      id: usuario.id,
      ...atualizarUsuarioDto,
    });
  }

  @Patch('/inativar')
  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Inativar usuário' })
  inativarUsuario(@GetUsuario() usuario: IUsuario) {
    this.clientUsuarioBackend.emit('inativar-usuario', usuario.id);
  }
}
