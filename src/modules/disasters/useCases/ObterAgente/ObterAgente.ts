import { Injectable } from '@nestjs/common';
import { AgenteRepository } from '../../repositories/AgenteRepository';
import { Agente } from '../../domain/agente/agente';

@Injectable()
export class ObterAgente {
  constructor(private readonly agenteRepository: AgenteRepository) {}

  async execute(id: string): Promise<Agente> {
    return await this.agenteRepository.getById(id);
  }
}
