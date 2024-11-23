import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
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
import { IUsuario } from '../shared/interfaces/usuario.interface';
import { CriarPagamentoDto } from './dto/criar-pagamento.dto';

@ApiTags('pagamento')
@Controller('pagamento')
export class PagamentoController {
  constructor(private clientProxyService: ClientProxyService) {}

  private clientPagamentoBackend =
    this.clientProxyService.getClientProxyPagamentoServiceInstance();

  @Get('stripe-key')
  @ApiOperation({ summary: 'Retorna a publishable key do stripe' })
  async buscarPublishableKey() {
    return this.clientPagamentoBackend.send('buscar-publishable-key', '');
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), PerfisGuard)
  @ApiSecurity('token')
  @Perfis([PerfilEnum.CLIENTE])
  @ApiOperation({ summary: 'Cria uma intenção de pagamento' })
  async criarIntencaoDePagamento(
    @Body() criarPagamentoDto: CriarPagamentoDto,
    @GetUsuario() usuario: IUsuario,
  ) {
    return this.clientPagamentoBackend
      .send('criar-intencao-de-pagamento', {
        ...criarPagamentoDto,
        idComprador: usuario.id,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new HttpException(error.message, error.status)),
        ),
      );
  }
}
