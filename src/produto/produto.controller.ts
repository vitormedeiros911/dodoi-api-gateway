import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, throwError } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { PerfisGuard } from '../shared/guards/perfil.guard';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { FavoritoDto } from './dto/favoritos.dto';
import { FiltrosProdutoDto } from './dto/filtros-produto.dto';
import { ProdutoDto } from './dto/produto.dto';

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
  criarProduto(
    @Body() produtoDto: ProdutoDto,
    @GetUsuario() usuario: IUsuario,
  ) {
    this.clientProdutoBackend.emit('criar-produto', {
      ...produtoDto,
      idFarmacia: usuario.idFarmacia,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Buscar produtos' })
  async buscarProdutos(@Query() filtrosProdutoDto: FiltrosProdutoDto) {
    return this.clientProdutoBackend.send('buscar-produtos', filtrosProdutoDto);
  }

  @Post('favorito')
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.CLIENTE])
  @ApiOperation({ summary: 'Criar favorito' })
  criarFavorito(
    @Body() favoritoDto: FavoritoDto,
    @GetUsuario() usuario: IUsuario,
  ) {
    this.clientProdutoBackend.emit('criar-favorito', {
      ...favoritoDto,
      idCliente: usuario.id,
    });
  }

  @Delete(':id/favorito')
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.CLIENTE])
  @ApiOperation({ summary: 'Remover favorito' })
  deletarFavorito(@Param('id') id: string, @GetUsuario() usuario: IUsuario) {
    this.clientProdutoBackend.emit('remover-favorito', {
      idProduto: id,
      idCliente: usuario.id,
    });
  }

  @Get('favoritos')
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.CLIENTE])
  @ApiOperation({ summary: 'Buscar produtos favoritos' })
  async buscarProdutosFavoritos(
    @GetUsuario() usuario: IUsuario,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.clientProdutoBackend.send('buscar-produtos-favoritos', {
      ...paginationDto,
      idCliente: usuario.id,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por id' })
  async buscarProdutoPorId(
    @Param('id') id: string,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientProdutoBackend
      .send('buscar-produto-por-id', { id, idCliente: usuario.id })
      .pipe(
        catchError((error) =>
          throwError(() => new HttpException(error.response, error.status)),
        ),
      );
  }

  @Put(':id')
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Atualizar produto' })
  async atualizarProduto(
    @Param('id') id: string,
    @Body() produtoDto: ProdutoDto,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientProdutoBackend
      .send('atualizar-produto', {
        id,
        ...produtoDto,
        idFarmacia: usuario.idFarmacia,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new HttpException(error.response, error.status)),
        ),
      );
  }
}
