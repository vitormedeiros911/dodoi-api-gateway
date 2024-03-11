import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClientProxyModule } from './client-proxy/client-proxy.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientProxyModule,
    ProdutoModule,
  ],
})
export class AppModule {}
