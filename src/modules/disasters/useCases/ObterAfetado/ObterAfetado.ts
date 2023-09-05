import { Injectable } from '@nestjs/common';
import { AfetadoRepository } from '../../repositories/AfetadoRepository';
import { AppError } from 'src/core/logic/error';

@Injectable()
export class ObterAfetado {
  constructor(private readonly afetadoRepository: AfetadoRepository) {}

  async execute(affectedId: string) {
    const affecteds = await this.afetadoRepository.find(affectedId);

    if (!affecteds) throw new AppError('Afetado não existente!');

    return affecteds;
  }
}
