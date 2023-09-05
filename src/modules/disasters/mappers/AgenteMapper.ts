import { Agente as PersistenceAgent, Prisma } from '@prisma/client';
import { Agente } from '../domain/agente/agente';
import { Usuario } from '../domain/usuario/usuario';

const agentQueryWithUser = Prisma.validator<Prisma.AgenteArgs>()({
  include: { user: true },
});

type AgentWithUser = Prisma.AgenteGetPayload<typeof agentQueryWithUser>;

export class AgenteMapper {
  static toDomain(raw: PersistenceAgent) {
    return new Agente({
      id: raw.id,
      funcao: raw.funcao,
      contato: raw.contato,
      usuarioId: raw.usuarioId,
    });
  }

  static toDomainWithUser(raw: AgentWithUser) {
    return new Agente({
      id: raw.id,
      funcao: raw.funcao,
      contato: raw.contato,
      usuarioId: raw.usuarioId,
      usuario: new Usuario({
        id: raw.user.id,
        nome: raw.user.nome,
        cpf: raw.user.cpf,
      }),
    });
  }

  static toPersistence(agent: Agente) {
    return {
      id: agent.id,
      funcao: agent.funcao,
      contato: agent.contato,
      usuarioId: agent.usuarioId,
    };
  }
}
