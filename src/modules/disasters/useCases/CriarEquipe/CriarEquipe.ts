import { AppError } from 'src/core/logic/error';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import { AgenteRepository } from '../../repositories/AgenteRepository';
import { CreateTeamDTO } from '../../dtos/CreateTeamDTO';
import { Agente } from '../../domain/agente/agente';
import { Equipe } from '../../domain/agenteEquipe/equipe';
import { EquipeRepository } from '../../repositories/EquipeRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CriarEquipe {
  constructor(
    private affectedAreaRepository: AreaAfetadaRepository,
    private agentRepository: AgenteRepository,
    private teamRepository: EquipeRepository,
  ) {}

  async execute(data: CreateTeamDTO) {
    const affectedArea = await this.affectedAreaRepository.find(
      data.affectedAreaId,
    );

    if (!affectedArea) {
      throw new AppError('Area not found');
    }

    const newAgents: Agente[] = [];
    for (const agent of data.agents) {
      const agentExists = await this.agentRepository.getById(agent);

      if (!agentExists) {
        throw new AppError('Agente not found');
      }

      newAgents.push(agentExists);
    }

    if (!newAgents.find((e) => e.id === data.leaderId)) {
      throw new AppError('Leader not found');
    }

    const team = new Equipe({
      name: data.name,
      areaAfetadaId: data.affectedAreaId,
      lider_id: data.leaderId,
      agentes: newAgents,
    });

    await this.teamRepository.save(team);
  }
}
