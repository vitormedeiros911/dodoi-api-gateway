import { Body, Controller, Get, Patch, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@ApiTags('Usuário')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly clientProxyService: ClientProxyService) {}

  private clientUsuarioBackend =
    this.clientProxyService.getClientProxyUsuarioServiceInstance();

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

  @Patch('/perfil')
  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Atualizar perfil de usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        perfis: {
          type: 'array',
          items: {
            type: 'string',
            enum: Object.values(PerfilEnum),
          },
        },
      },
    },
  })
  atualizarPerfilUsuario(
    @GetUsuario() usuario: IUsuario,
    @Body() perfisDto: { perfis: PerfilEnum[] },
  ) {
    this.clientUsuarioBackend.emit('atualizar-usuario', {
      id: usuario.id,
      perfis: perfisDto.perfis,
    });
  }
}
