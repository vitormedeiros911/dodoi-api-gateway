import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { PerfisGuard } from '../shared/guards/perfil.guard';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { FiltrosProdutoDto } from './dto/filtros-produto.dto';

@Controller('produto')
@ApiTags('Produto')
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('token')
export class ProdutoController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientProdutoBackend =
    this.clientProxyService.getClientProxyProdutoServiceInstance();

  @Post()
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Criar produto' })
  criarProduto(@Body() criarProdutoDto: CriarProdutoDto) {
    this.clientProdutoBackend.emit('criar-produto', criarProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar produtos' })
  async buscarProdutos(@Query() filtrosProdutoDto: FiltrosProdutoDto) {
    return this.clientProdutoBackend.send('buscar-produtos', filtrosProdutoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por id' })
  async buscarProdutoPorId(@Param('id') id: string) {
    return this.clientProdutoBackend.send('buscar-produto-por-id', id);
  }
}
