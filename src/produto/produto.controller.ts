import {
  Body,
  Controller,
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
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { PerfisGuard } from '../shared/guards/perfil.guard';
import { StatusEnum } from '../shared/interfaces/status.enum';
import { IUsuario } from '../shared/interfaces/usuario.interface';
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

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por id' })
  async buscarProdutoPorId(@Param('id') id: string) {
    return this.clientProdutoBackend
      .send('buscar-produto-por-id', id)
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
        produto: {
          ...produtoDto,
          idFarmacia: usuario.idFarmacia,
        },
      })
      .pipe(
        catchError((error) =>
          throwError(() => new HttpException(error.response, error.status)),
        ),
      );
  }

  @Put(':id/ativar')
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Ativar produto' })
  async ativarProduto(
    @Param('id') id: string,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientProdutoBackend
      .send('atualizar-produto', {
        id,
        idFarmacia: usuario.idFarmacia,
        status: StatusEnum.ATIVO,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new HttpException(error.response, error.status)),
        ),
      );
  }

  @Put(':id/inativar')
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Inativar produto' })
  async inativarProduto(
    @Param('id') id: string,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientProdutoBackend
      .send('atualizar-produto', {
        id,
        idFarmacia: usuario.idFarmacia,
        status: StatusEnum.INATIVO,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new HttpException(error.response, error.status)),
        ),
      );
  }
}
