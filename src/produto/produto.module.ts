import { Module } from '@nestjs/common';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { ProdutoController } from './produto.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
