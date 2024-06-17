import { Module } from '@nestjs/common';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [PedidoController],
})
export class PedidoModule {}
