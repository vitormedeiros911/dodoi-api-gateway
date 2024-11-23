import { Module } from '@nestjs/common';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [ClientProxyModule],
  controllers: [WebhookController],
})
export class WebhookModule {}
