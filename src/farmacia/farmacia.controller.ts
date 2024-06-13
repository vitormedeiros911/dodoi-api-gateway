import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
    this.clientFarmaciaBackend.emit('criar-farmacia', criarFarmaciaDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar farmácia por id' })
  buscarFarmaciaPorId(@Param('id') id: string) {
    return this.clientFarmaciaBackend.send('buscar-farmacia-por-id', id);
  }
}
