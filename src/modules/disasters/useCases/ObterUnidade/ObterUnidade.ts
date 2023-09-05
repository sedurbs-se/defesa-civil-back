import { Injectable } from '@nestjs/common';
import { UnidadeHabitacional } from '../../domain/unidadeHabitacional/unidade-habitacional';
import { UnidadeHabitacionalRepository } from '../../repositories/UnidadeHabitacionalRepository';

@Injectable()
export class ObterUnidade {
  constructor(
    private readonly housingUnitRepository: UnidadeHabitacionalRepository,
  ) {}

  async execute(unit_id: string): Promise<UnidadeHabitacional> {
    return await this.housingUnitRepository.find(unit_id);
  }
}
