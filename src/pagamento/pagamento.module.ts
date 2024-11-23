import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamento.controller';
import { ClientProxyModule } from '../client-proxy/client-proxy.module';

@Module({
  imports: [ClientProxyModule],
  controllers: [PagamentoController],
})
export class PagamentoModule {}
