import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { ClientProxyService } from './client-proxy.service';

describe('ClientProxyService', () => {
  let clientProxyService: ClientProxyService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientProxyService],
    })
      .useMocker(() => createMock())
      .compile();

    clientProxyService = module.get<ClientProxyService>(ClientProxyService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('deveria estar definido', () => {
    expect(clientProxyService).toBeDefined();
  });

  describe('getClientProxyProdutoServiceInstance', () => {
    it('deveria retornar uma instância válida de ClientProxy', () => {
      const getConfigSpy = jest
        .spyOn(configService, 'get')
        .mockReturnValue('teste');

      const clientProxy =
        clientProxyService.getClientProxyProdutoServiceInstance();

      expect(getConfigSpy).toHaveBeenCalledTimes(3);
      expect(clientProxy).toBeInstanceOf(ClientProxy);
      expect(clientProxy).toHaveProperty('connect');
      expect(clientProxy).toHaveProperty('send');
    });
  });
});
