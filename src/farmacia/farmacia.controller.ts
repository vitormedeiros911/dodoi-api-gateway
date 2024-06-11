import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { CriarFarmaciaDto } from './dto/criar-farmacia.dto';

@ApiTags('farmacia')
@Controller('farmacia')
export class FarmaciaController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientFarmaciaBackend =
    this.clientProxyService.getClientProxyFarmaciaServiceInstance();

  @Post()
  criarFarmacia(@Body() criarFarmaciaDto: CriarFarmaciaDto) {
    this.clientFarmaciaBackend.emit('criar-farmacia', criarFarmaciaDto);
  }
}
