import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import Stripe from 'stripe';

import { ClientProxyService } from '../client-proxy/client-proxy.service';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly clientProxyService: ClientProxyService) {}

  private clientPedidoBackend =
    this.clientProxyService.getClientProxyPedidoServiceInstance();

  @Post('stripe')
  @ApiOperation({ summary: 'Recebe atualização de pagamento do Stripe' })
  webhookStripe(@Body() eventoPagamento: Stripe.Event) {
    if (eventoPagamento.type === 'charge.succeeded') {
      this.clientPedidoBackend.emit(
        'atualizar-pedido-pago',
        eventoPagamento.data.object.payment_intent,
      );
    }
  }
}
