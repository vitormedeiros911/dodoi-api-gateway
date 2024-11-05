import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { FiltrosPedidoDto } from './dto/filtros-pedido.dto';
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
  async criarPedido(
    @Body() pedido: PedidoDto,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientPedidoBackend.emit('criar-pedido', {
      idCliente: usuario.id,
      ...pedido,
    });
  }

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
