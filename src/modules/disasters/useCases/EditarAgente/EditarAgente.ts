import { Injectable } from '@nestjs/common';
import { AgenteRepository } from '../../repositories/AgenteRepository';
import { Agente } from '../../domain/agente/agente';

interface EditarAgenteRequest {
  id: string;
  agent: Agente;
}

@Injectable()
export class EditarAgente {
  constructor(private readonly agentRepository: AgenteRepository) {}

  async execute({ agent }: EditarAgenteRequest): Promise<void> {
    await this.agentRepository.update(agent);
  }
}
