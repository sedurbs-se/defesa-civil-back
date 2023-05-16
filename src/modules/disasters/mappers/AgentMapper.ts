import { Agente as PersistenceAgent } from '@prisma/client';
import { Agent } from '../domain/Agent/Agent';

export class AgentMapper {
  static toDomain(raw: PersistenceAgent) {
    return new Agent({
      id: raw.id,
      function: raw.funcao,
      contact: raw.contato,
      user_id: raw.usuarioId,
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
