import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { FiltrosPedidoDto } from './dto/filtros-pedido.dto';

@ApiTags('Pedido')
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('token')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly clientProxyService: ClientProxyService) {}

  private clientPedidoBackend =
    this.clientProxyService.getClientProxyPedidoServiceInstance();

  @Get()
  @Perfis([PerfilEnum.CLIENTE, PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Listar pedidos' })
  async listarPedidos(@Query() filtrosPedidoDto: FiltrosPedidoDto) {
    return this.clientPedidoBackend.send('listar-pedidos', filtrosPedidoDto);
  }

  @Post('aceitar')
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Aceitar um pedido' })
  async aceitarPedido(@Body('idPedido') idPedido: string) {
    return this.clientPedidoBackend.emit('aceitar-pedido', idPedido);
  }
}
