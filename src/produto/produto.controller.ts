import { Controller, Post } from '@nestjs/common';
import { ClientProxyService } from 'src/client-proxy/client-proxy.service';

@Controller('produto')
export class ProdutoController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientProdutoBackend =
    this.clientProxyService.getClientProxyProdutoServiceInstance();

  @Post()
  async criarProduto() {
    return this.clientProdutoBackend.emit('criar-produto', {
      message: 'Hello from API Gateway!',
    });
  }
}
