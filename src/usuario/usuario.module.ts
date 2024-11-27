import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [ClientProxyModule, JwtModule],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
