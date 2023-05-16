import { Equipe as PersistenceTeam, Prisma } from '@prisma/client';
import { Team } from '../domain/agentTeam/team';
import { Agent } from '../domain/agent/agent';

const teamWithAgent = Prisma.validator<Prisma.EquipeArgs>()({
  include: { equipeAgente: true },
});

type TeamWithAgent = Prisma.EquipeGetPayload<typeof teamWithAgent>;

export class TeamMapper {
  static toDomain(raw: TeamWithAgent) {
    return new Team({
      id: raw.id,
      name: raw.nome,
      contact: raw.contato,
      function: raw.funcao,
      affected_area_id: raw.areaAfetadaId,
      lider_id: raw.equipeAgente.find((e) => e.fl_lider_equipe).agenteId,
    });
  }

  static toPersistence(Team: Team) {
    return {
      id: Team.id,
      nome: Team.name,
      contato: Team.contact,
      funcao: Team.function,
      areaAfetadaId: Team.affected_area_id,
      agentes: Team.agents.map((e) => ({
        fl_lider_equipe: Team.lider_id === e.id,
        agenteId: e.id,
        equipeId: Team.id,
      })),
    };
  }
}
