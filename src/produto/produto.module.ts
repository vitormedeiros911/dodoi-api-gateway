import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ClientProxyModule } from 'src/client-proxy/client-proxy.module';

@Module({
  imports: [ClientProxyModule],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
