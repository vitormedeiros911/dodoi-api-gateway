import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClientProxyModule } from './client-proxy/client-proxy.module';
import { FarmaciaModule } from './farmacia/farmacia.module';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { CarrinhoModule } from './carrinho/carrinho.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientProxyModule,
    ProdutoModule,
    FarmaciaModule,
    UsuarioModule,
    AuthModule,
    CarrinhoModule,
  ],
})
export class AppModule {}
