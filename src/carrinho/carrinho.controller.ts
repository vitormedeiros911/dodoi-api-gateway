import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { CarrinhoDto } from './dto/carrinho.dto';

@ApiTags('Carrinho')
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('token')
@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly clientProxyService: ClientProxyService) {}

  private clientCarrinhoBackend =
    this.clientProxyService.getClientProxyCarrinhoServiceInstance();

  @Post()
  async criarCarrinho(
    @Body() carrinhoDto: CarrinhoDto,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientCarrinhoBackend.emit('criar-carrinho', {
      idUsuario: usuario.id,
      ...carrinhoDto,
    });
  }
}
