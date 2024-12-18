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
import { catchError } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { GetUsuario } from '../shared/decorators/get-user.decorator';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { FarmaciaDto } from './dto/farmacia.dto';
import { FiltrosFarmaciaDto } from './dto/filtros-produto.dto';

@ApiTags('Farmácia')
@Controller('farmacia')
export class FarmaciaController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientFarmaciaBackend =
    this.clientProxyService.getClientProxyFarmaciaServiceInstance();

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Criar farmácia' })
  criarFarmacia(
    @Body() farmaciaDto: FarmaciaDto,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientFarmaciaBackend
      .send('criar-farmacia', {
        ...farmaciaDto,
        idUsuarioAdmin: usuario.id,
      })
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response, error.status);
        }),
      );
  }

  @Get()
  @ApiOperation({ summary: 'Buscar farmácias' })
  async buscarProdutos(@Query() filtrosFarmaciaDto: FiltrosFarmaciaDto) {
    return this.clientFarmaciaBackend
      .send('buscar-farmacias', filtrosFarmaciaDto)
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response, error.status);
        }),
      );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Buscar farmácia por id' })
  async buscarFarmaciaPorId(@Param('id') id: string) {
    return this.clientFarmaciaBackend.send('buscar-farmacia-por-id', id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiSecurity('token')
  @ApiOperation({ summary: 'Atualizar farmácia' })
  atualizarFarmacia(@Param('id') id: string, @Body() farmaciaDto: FarmaciaDto) {
    this.clientFarmaciaBackend.emit('atualizar-farmacia', {
      id,
      ...farmaciaDto,
    });
  }
}
