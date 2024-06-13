import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { Perfis } from '../shared/decorators/perfis.decorator';
import { PerfisGuard } from '../shared/guards/perfil.guard';
import { PerfilEnum } from '../shared/enum/perfil.enum';
import { CriarFarmaciaDto } from './dto/criar-farmacia.dto';

@ApiTags('Farmácia')
@Controller('farmacia')
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('token')
export class FarmaciaController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientFarmaciaBackend =
    this.clientProxyService.getClientProxyFarmaciaServiceInstance();

  @Post()
  @UseGuards(PerfisGuard)
  @Perfis([PerfilEnum.ADMIN_FARMACIA])
  @ApiOperation({ summary: 'Criar farmácia' })
  criarFarmacia(@Body() criarFarmaciaDto: CriarFarmaciaDto) {
    this.clientFarmaciaBackend.emit('criar-farmacia', criarFarmaciaDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar farmácia por id' })
  async buscarFarmaciaPorId(@Param('id') id: string) {
    return this.clientFarmaciaBackend.send('buscar-farmacia-por-id', id);
  }
}
