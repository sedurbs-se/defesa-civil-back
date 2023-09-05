import { Prisma } from '@prisma/client';
import { Equipe } from '../domain/agenteEquipe/equipe';
import { Agente } from '../domain/agente/agente';

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

export class EquipeMapper {
  static toDomain(raw: TeamWithAgent) {
    return new Equipe({
      id: raw.id,
      name: raw.nome,
      affected_area_id: raw.areaAfetadaId,
      lider_id: raw.equipeAgente.find((e) => e.fl_lider_equipe).agenteId,
      agents: raw.equipeAgente.map((ea) => {
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
      areaAfetadaId: Equipe.affected_area_id,
      agentes: Equipe.agents.map((e) => ({
        fl_lider_equipe: Equipe.lider_id === e.id,
        agenteId: e.id,
        equipeId: Equipe.id,
      })),
    };
  }
}
