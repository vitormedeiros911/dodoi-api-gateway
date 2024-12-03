import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

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

  @Get(':idPedido')
  @Perfis([PerfilEnum.CLIENTE, PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Buscar pedido por id' })
  @ApiParam({ name: 'idPedido', type: String })
  async buscarPedidoPorId(@Param('idPedido') idPedido: string) {
    return this.clientPedidoBackend.send('buscar-pedido-por-id', idPedido);
  }

  @Patch(':idPedido/aceitar')
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Aceitar um pedido' })
  @ApiParam({ name: 'idPedido', type: String })
  aceitarPedido(@Param('idPedido') idPedido: string) {
    this.clientPedidoBackend.emit('aceitar-pedido', idPedido);
  }

  @Patch(':idPedido/cancelar')
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Cancelar um pedido' })
  @ApiParam({ name: 'idPedido', type: String })
  cancelarPedido(@Param('idPedido') idPedido: string) {
    this.clientPedidoBackend.emit('cancelar-pedido', idPedido);
  }

  @Patch(':idPedido/iniciar-entrega')
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Iniciar entrega de um pedido' })
  @ApiParam({ name: 'idPedido', type: String })
  iniciarEntrega(@Param('idPedido') idPedido: string) {
    this.clientPedidoBackend.emit('iniciar-entrega', idPedido);
  }

  @Patch(':idPedido/finalizar-entrega')
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Finalizar entrega de um pedido' })
  @ApiParam({ name: 'idPedido', type: String })
  finalizarEntrega(@Param('idPedido') idPedido: string) {
    this.clientPedidoBackend.emit('finalizar-entrega', idPedido);
  }
}
