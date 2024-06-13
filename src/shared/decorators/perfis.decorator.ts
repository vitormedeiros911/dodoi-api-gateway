import { Reflector } from '@nestjs/core';

export const Perfis = Reflector.createDecorator<string[]>();
