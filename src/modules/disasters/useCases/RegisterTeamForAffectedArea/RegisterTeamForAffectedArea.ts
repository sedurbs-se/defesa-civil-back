import { AppError } from 'src/core/logic/error';
import { AffectedAreaRepository } from '../../repositories/IAffectedAreaRepository';
import { IAgentRepository } from '../../repositories/IAgentRepository';
import { CreateTeamDTO } from '../../dtos/CreateTeamDTO';
import { Agent } from '../../domain/agent/agent';
import { Team } from '../../domain/agentTeam/team';
import { ITeamRepository } from '../../repositories/ITeamRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterTeamForAffectedArea {
  constructor(
    private affectedAreaRepository: AffectedAreaRepository,
    private agentRepository: IAgentRepository,
    private teamRepository: ITeamRepository,
  ) {}

  async execute(data: CreateTeamDTO) {
    const affectedArea = await this.affectedAreaRepository.find(
      data.affectedAreaId,
    );

    if (!affectedArea) {
      throw new AppError('Area not found');
    }

    const newAgents: Agent[] = [];
    for (const agent of data.agents) {
      const agentExists = await this.agentRepository.getById(agent);

      if (!agentExists) {
        throw new AppError('Agent not found');
      }

      newAgents.push(agentExists);
    }

    if(!newAgents.find((e) => e.id === data.leaderId)) {
      throw new AppError('Leader not found');
    }

    const team = new Team({
      name: data.name,
      contact: data.contact,
      function: data.function,
      affected_area_id: data.affectedAreaId,
      lider_id: data.leaderId,
      agents: newAgents,
    })

    await this.teamRepository.save(team);
  }
}
