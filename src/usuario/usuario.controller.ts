import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyService } from 'src/client-proxy/client-proxy.service';

import { CriarUsuarioDto } from './dto/criar-usuario.dto';

@ApiTags('Usuário')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly clientProxyService: ClientProxyService) {}

  private clientUsuarioBackend =
    this.clientProxyService.getClientProxyUsuarioServiceInstance();

  @Post()
  async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<void> {
    this.clientUsuarioBackend.emit('criar-usuario', criarUsuarioDto);
  }
}
