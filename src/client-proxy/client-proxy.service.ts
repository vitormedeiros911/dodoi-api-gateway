import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyService {
  constructor(private configService: ConfigService) {}

  private getEnvKey(env: string): string {
    return this.configService.get<string>(env);
  }

  private getRMQUri(): string {
    return `amqp://${this.getEnvKey('RMQ_USER')}:${this.getEnvKey('RMQ_PASSWORD')}@${this.getEnvKey('RMQ_HOST')}`;
  }

  getClientProxyProdutoServiceInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.getRMQUri()],
        queue: 'produto-service',
      },
    });
  }
}
