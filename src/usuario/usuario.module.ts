import { Module } from '@nestjs/common';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
