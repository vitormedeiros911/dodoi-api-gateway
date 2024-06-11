import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyService } from 'src/client-proxy/client-proxy.service';

import { CriarProdutoDto } from './dto/criar-produto.dto';
import { FiltrosProdutoDto } from './dto/filtros-produto.dto';

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

  @Get()
  async buscarProdutos(@Query() filtrosProdutoDto: FiltrosProdutoDto) {
    return this.clientProdutoBackend.send('buscar-produtos', filtrosProdutoDto);
  }

  @Get(':id')
  async buscarProdutoPorId(@Query('id') id: string) {
    return this.clientProdutoBackend.send('buscar-produto-por-id', id);
  }
}
