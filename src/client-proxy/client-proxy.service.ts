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

  private url = `amqp://${this.configService.get<string>('RMQ_USER')}:${this.configService.get<string>('RMQ_PASSWORD')}@${this.configService.get<string>('RMQ_HOST')}`;

  getClientProxyProdutoServiceInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.url],
        queue: 'produtos',
      },
    });
  }

  getClientProxyFarmaciaServiceInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.url],
        queue: 'farmacias',
      },
    });
  }

  getClientProxyUsuarioServiceInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.url],
        queue: 'usuarios',
      },
    });
  }

  getClientProxyCarrinhoServiceInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.url],
        queue: 'carrinhos',
      },
    });
  }

  getClientProxyPedidoServiceInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.url],
        queue: 'pedidos',
      },
    });
  }
}
