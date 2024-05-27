import { Controller, Post } from '@nestjs/common';
import { ClientProxyService } from 'src/client-proxy/client-proxy.service';

import { CriarProdutoDto } from './dto/criar-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientProdutoBackend =
    this.clientProxyService.getClientProxyProdutoServiceInstance();

  @Post()
  criarProduto(criarProdutoDto: CriarProdutoDto) {
    this.clientProdutoBackend.emit('criar-produto', criarProdutoDto);
  }
}
