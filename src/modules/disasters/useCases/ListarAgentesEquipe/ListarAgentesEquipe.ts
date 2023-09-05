import { AppError } from 'src/core/logic/error';
import { EquipeRepository } from '../../repositories/EquipeRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarAgentesEquipe {
  constructor(private teamRepository: EquipeRepository) {}

  async execute(teamId: string) {
    const team = await this.teamRepository.find(teamId);

    if (!team) {
      throw new AppError('Team not found');
    }

    return {
      team: {
        id: team.id,
        name: team.name,
        affectedAreaId: team.affected_area_id,
        leaderId: team.lider_id,
        agents: team.agents.map((agent) => ({
          id: agent.id,
          user_id: agent.usuarioId,
          contact: agent.contato,
          function: agent.funcao,
          leader_team: agent.fl_lider_equipe,
        })),
      },
    };
  }
}
