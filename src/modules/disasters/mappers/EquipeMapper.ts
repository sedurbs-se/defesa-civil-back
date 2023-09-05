import { Prisma } from '@prisma/client';
import { Equipe } from '../domain/agenteEquipe/equipe';
import { Agente } from '../domain/agente/agente';
import { AreaAfetada } from '../domain/areaAfetada/area-afetada';
import { AreaAfetadaMapper } from './AreaAfetadaMapper';

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

export class EquipeMapper {
  static toDomain(raw: TeamWithAgent) {
    return new Equipe({
      id: raw.id,
      name: raw.nome,
      areaAfetadaId: raw.areaAfetadaId,
      lider_id: raw.equipeAgente.find((e) => e.fl_lider_equipe).agenteId,
      agentes: raw.equipeAgente.map((ea) => {
        return new Agente({
          id: ea.agenteId,
          usuarioId: ea.agente.usuarioId,
          contato: ea.agente.contato,
          funcao: ea.agente.funcao,
          fl_lider_equipe: ea.fl_lider_equipe,
        });
      }),
    });
  }

  static toDomainWithArea(raw: TeamWithAgentAndArea) {
    return new Equipe({
      id: raw.id,
      name: raw.nome,
      areaAfetadaId: raw.areaAfetadaId,
      lider_id: raw.equipeAgente.find((e) => e.fl_lider_equipe).agenteId,
      areaAfetada: AreaAfetadaMapper.toDomain(raw.areaAfetada),
      agentes: raw.equipeAgente.map((ea) => {
        return new Agente({
          id: ea.agenteId,
          usuarioId: ea.agente.usuarioId,
          contato: ea.agente.contato,
          funcao: ea.agente.funcao,
          fl_lider_equipe: ea.fl_lider_equipe,
        });
      }),
    });
  }

  static toPersistence(Equipe: Equipe) {
    return {
      id: Equipe.id,
      nome: Equipe.name,
      areaAfetadaId: Equipe.areaAfetadaId,
      agentes: Equipe.agentes.map((e) => ({
        fl_lider_equipe: Equipe.lider_id === e.id,
        agenteId: e.id,
        equipeId: Equipe.id,
      })),
    };
  }
}
