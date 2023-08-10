import { Agente as PersistenceAgent, Prisma } from '@prisma/client';
import { Agent } from '../domain/Agent/Agent';
import { User } from '../domain/user/user';

const agentQueryWithUser = Prisma.validator<Prisma.AgenteArgs>()({
  include: { user: true },
});

type AgentWithUser = Prisma.AgenteGetPayload<typeof agentQueryWithUser>;

export class AgentMapper {
  static toDomain(raw: PersistenceAgent) {
    return new Agent({
      id: raw.id,
      function: raw.funcao,
      contact: raw.contato,
      user_id: raw.usuarioId,
    });
  }

  static toDomainWithUser(raw: AgentWithUser) {
    return new Agent({
      id: raw.id,
      function: raw.funcao,
      contact: raw.contato,
      user_id: raw.usuarioId,
      user: new User({
        id: raw.user.id,
        name: raw.user.nome,
        cpf: raw.user.cpf,
      }),
    });
  }

  static toPersistence(agent: Agent) {
    return {
      id: agent.id,
      funcao: agent.function,
      contato: agent.contact,
      usuarioId: agent.user_id,
    };
  }
}
