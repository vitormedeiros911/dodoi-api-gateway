import { Module } from '@nestjs/common';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { CarrinhoController } from './carrinho.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [CarrinhoController],
})
export class CarrinhoModule {}
