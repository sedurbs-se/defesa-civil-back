import { Injectable } from '@nestjs/common';
import { AffectedRepository } from '../../repositories/IAffectedRepository';
import { AppError } from 'src/core/logic/error';

@Injectable()
export class ObterAfetado {
  constructor(private readonly affectedRepository: AffectedRepository) {}

  async execute(affectedId: string) {
    const affecteds = await this.affectedRepository.find(affectedId);

    if (!affecteds) throw new AppError('Afetado não existente!');

    return affecteds;
  }
}
