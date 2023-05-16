import { Usuario as PersistenceUser, Prisma } from '@prisma/client';
import { User } from '../domain/user/user';
import { Agent } from '../domain/agent/agent';

const userWithAgent = Prisma.validator<Prisma.UsuarioArgs>()({
  include: { agente: true },
});

type UserWithAgent = Prisma.UsuarioGetPayload<typeof userWithAgent>;

export class UserMapper {
  static toDomain(raw: PersistenceUser) {
    return new User({
      id: raw.id,
      name: raw.nome,
      cpf: raw.cpf,
    });
  }

  static toDomainWithDetails(raw: UserWithAgent) {
    return new User({
      id: raw.id,
      name: raw.nome,
      cpf: raw.cpf,
      agent: new Agent({
        id: raw.agente.id,
        function: raw.agente.funcao,
        contact: raw.agente.contato,
        user_id: raw.agente.usuarioId,
      }),
    });
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      nome: user.name,
      cpf: user.cpf,
    };
  }
}
