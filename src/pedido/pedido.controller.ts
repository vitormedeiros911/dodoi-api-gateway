import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { PedidoDto } from './dto/pedido.dto';

@ApiTags('Pedido')
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('token')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly clientProxyService: ClientProxyService) {}

  private clientPedidoBackend =
    this.clientProxyService.getClientProxyPedidoServiceInstance();

  @Post()
  @Perfis([PerfilEnum.CLIENTE])
  @ApiOperation({ summary: 'Criar um pedido' })
  async criarPedido(pedido: PedidoDto, @GetUsuario() usuario: IUsuario) {
    return this.clientPedidoBackend.emit('criar-pedido', {
      idCliente: usuario.id,
      ...pedido,
    });
  }
}
