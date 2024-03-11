import { Module } from '@nestjs/common';
import { ClientProxyModule } from './client-proxy/client-proxy.module';

@Module({
  imports: [ClientProxyModule],
})
export class AppModule {}
