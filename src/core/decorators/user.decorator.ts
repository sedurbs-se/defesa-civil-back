import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from 'src/modules/disasters/domain/usuario/usuario';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return new Usuario(request.user);
  },
);
