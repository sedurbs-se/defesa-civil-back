import { AppError } from 'src/core/logic/error';
import { EquipeRepository } from '../../repositories/EquipeRepository';
import { Injectable } from '@nestjs/common';
import { EditTeamDTO } from '../../dtos/EditTeamDTO';
import { Equipe } from '../../domain/agenteEquipe/equipe';
import { AgenteRepository } from '../../repositories/AgenteRepository';

@Injectable()
export class EditarEquipe {
  constructor(
    private teamRepository: EquipeRepository,
    private agentsRepository: AgenteRepository,
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

    const domainTeam = new Equipe({
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
