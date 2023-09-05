import { Injectable } from '@nestjs/common';
import { AppError } from 'src/core/logic/error';
import { EquipeRepository } from '../../repositories/EquipeRepository';
import { AgenteRepository } from '../../repositories/AgenteRepository';

@Injectable()
export class ObterEquipePorAgente {
  constructor(
    private readonly equipeRepositorio: EquipeRepository,
    private readonly agentRepository: AgenteRepository,
  ) {}

  async execute(agent_id: string) {
    const a = await this.agentRepository.getById(agent_id);

    if (!a) throw new AppError('Agente não encontrado', 404);

    const teams = await this.equipeRepositorio.findByAgentId(agent_id);

    return teams;
  }
}
