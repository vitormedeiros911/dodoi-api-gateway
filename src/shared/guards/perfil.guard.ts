import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Perfis } from '../decorators/perfis.decorator';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable()
export class PerfisGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const perfis = this.reflector.get(Perfis, context.getHandler());

    const usuario = context.switchToHttp().getRequest().user as IUsuario;

    return usuario.perfis.some((perfil) => perfis.includes(perfil));
  }
}
