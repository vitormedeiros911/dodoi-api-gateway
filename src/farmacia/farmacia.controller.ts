import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { FarmaciaDto } from './dto/farmacia.dto';

@ApiTags('Farmácia')
@Controller('farmacia')
export class FarmaciaController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientFarmaciaBackend =
    this.clientProxyService.getClientProxyFarmaciaServiceInstance();

  @Post()
  @ApiOperation({ summary: 'Criar farmácia' })
  criarFarmacia(@Body() farmaciaDto: FarmaciaDto) {
    return this.clientFarmaciaBackend.send('criar-farmacia', farmaciaDto).pipe(
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
  async atualizarFarmacia(
    @Param('id') id: string,
    @Body() farmaciaDto: FarmaciaDto,
  ) {
    return this.clientFarmaciaBackend
      .send('atualizar-farmacia', { id, ...farmaciaDto })
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response, error.status);
        }),
      );
  }
}
