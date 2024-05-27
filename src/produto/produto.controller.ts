import { Body, Controller, Post } from '@nestjs/common';
import { ClientProxyService } from 'src/client-proxy/client-proxy.service';

import { CriarProdutoDto } from './dto/criar-produto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientProdutoBackend =
    this.clientProxyService.getClientProxyProdutoServiceInstance();

  @Post()
  criarProduto(@Body() criarProdutoDto: CriarProdutoDto) {
    this.clientProdutoBackend.emit('criar-produto', criarProdutoDto);
  }
}
