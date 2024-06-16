import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUsuario = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp().getRequest();
    return ctx.user;
  },
);
