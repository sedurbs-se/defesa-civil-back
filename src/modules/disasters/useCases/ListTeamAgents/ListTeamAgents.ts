import { AppError } from 'src/core/logic/error';
import { AffectedAreaRepository } from '../../repositories/IAffectedAreaRepository';
import { ITeamRepository } from '../../repositories/ITeamRepository';
import { Injectable } from '@nestjs/common';
import { Agent } from '../../domain/agent/agent';

@Injectable()
export class ListTeamAgents {
  constructor(private teamRepository: ITeamRepository) {}

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
          user_id: agent.user_id,
          contact: agent.contact,
          function: agent.function,
          leader_team: agent.fl_lider_equipe,
        })),
      },
    };
  }
}
