import { AppError } from 'src/core/logic/error';
import { ITeamRepository } from '../../repositories/ITeamRepository';
import { Injectable } from '@nestjs/common';
import { EditTeamDTO } from '../../dtos/EditTeamDTO';
import { Team } from '../../domain/agentTeam/team';
import { IAgentRepository } from '../../repositories/IAgentRepository';

@Injectable()
export class EditTeam {
  constructor(
    private teamRepository: ITeamRepository,
    private agentsRepository: IAgentRepository,
  ) {}

  async execute(teamId: string, teamDTO: EditTeamDTO) {
    const team = await this.teamRepository.find(teamId);

    if (!team) {
      throw new AppError('Team not found');
    }

    const agents = [];

    for (let i = 0; i < teamDTO.agents.length; i++) {
      const agent = await this.agentsRepository.getById(teamDTO.agents[i]);
      if (!agent) {
        throw new AppError('One of the agents was not found');
      }
      agents.push(agent);
    }

    const domainTeam = new Team({
      id: team.id,
      name: teamDTO.name,
      affected_area_id: teamDTO.affectedAreaId,
      lider_id: teamDTO.leaderId,
      agents,
    });

    await this.teamRepository.update(domainTeam);

    return {
      ok: true,
    };
  }
}
