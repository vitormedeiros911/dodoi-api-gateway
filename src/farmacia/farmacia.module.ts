import { Module } from '@nestjs/common';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { FarmaciaController } from './farmacia.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [FarmaciaController],
})
export class FarmaciaModule {}
