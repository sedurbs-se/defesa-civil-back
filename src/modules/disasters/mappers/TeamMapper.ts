import { Prisma } from '@prisma/client';
import { Team } from '../domain/agentTeam/team';
import { Agent } from '../domain/agent/agent';
import { AffectedArea } from '../domain/affectedArea/affected-area';
import { AffectedAreaMapper } from './AffectedAreaMapper';

const teamWithAgent = Prisma.validator<Prisma.EquipeArgs>()({
  include: {
    equipeAgente: {
      include: {
        agente: true,
      },
    },
  },
});

type TeamWithAgent = Prisma.EquipeGetPayload<typeof teamWithAgent>;
const teamWithAgentAndArea = Prisma.validator<Prisma.EquipeArgs>()({
  include: {
    equipeAgente: {
      include: {
        agente: true,
      },
    },
    areaAfetada: true,
  },
});

type TeamWithAgentAndArea = Prisma.EquipeGetPayload<
  typeof teamWithAgentAndArea
>;

export class TeamMapper {
  static toDomain(raw: TeamWithAgent) {
    return new Team({
      id: raw.id,
      name: raw.nome,
      affected_area_id: raw.areaAfetadaId,
      lider_id: raw.equipeAgente.find((e) => e.fl_lider_equipe).agenteId,
      agents: raw.equipeAgente.map((ea) => {
        return new Agent({
          id: ea.agenteId,
          user_id: ea.agente.usuarioId,
          contact: ea.agente.contato,
          function: ea.agente.funcao,
          fl_lider_equipe: ea.fl_lider_equipe,
        });
      }),
    });
  }

  static toDomainWithArea(raw: TeamWithAgentAndArea) {
    return new Team({
      id: raw.id,
      name: raw.nome,
      affected_area_id: raw.areaAfetadaId,
      lider_id: raw.equipeAgente.find((e) => e.fl_lider_equipe).agenteId,
      agents: raw.equipeAgente.map((ea) => {
        return new Agent({
          id: ea.agenteId,
          user_id: ea.agente.usuarioId,
          contact: ea.agente.contato,
          function: ea.agente.funcao,
          fl_lider_equipe: ea.fl_lider_equipe,
        });
      }),
      affected_area: AffectedAreaMapper.toDomain(raw.areaAfetada),
    });
  }
  static toPersistence(Team: Team) {
    return {
      id: Team.id,
      nome: Team.name,
      areaAfetadaId: Team.affected_area_id,
      agentes: Team.agents.map((e) => ({
        fl_lider_equipe: Team.lider_id === e.id,
        agenteId: e.id,
        equipeId: Team.id,
      })),
    };
  }
}
