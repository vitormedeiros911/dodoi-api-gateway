import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError } from 'rxjs';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { CriarFarmaciaDto } from './dto/criar-farmacia.dto';

@ApiTags('Farmácia')
@Controller('farmacia')
export class FarmaciaController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientFarmaciaBackend =
    this.clientProxyService.getClientProxyFarmaciaServiceInstance();

  @Post()
  @ApiOperation({ summary: 'Criar farmácia' })
  criarFarmacia(@Body() criarFarmaciaDto: CriarFarmaciaDto) {
    return this.clientFarmaciaBackend
      .send('criar-farmacia', criarFarmaciaDto)
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
}
