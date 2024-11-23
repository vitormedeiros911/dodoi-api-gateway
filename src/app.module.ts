import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ClientProxyModule } from './client-proxy/client-proxy.module';
import { FarmaciaModule } from './farmacia/farmacia.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientProxyModule,
    ProdutoModule,
    FarmaciaModule,
    UsuarioModule,
    AuthModule,
    PedidoModule,
    PagamentoModule,
    WebhookModule,
  ],
})
export class AppModule {}
