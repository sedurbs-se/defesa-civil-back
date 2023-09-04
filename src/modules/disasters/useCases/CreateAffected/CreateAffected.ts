import { Injectable } from '@nestjs/common';
import { AffectedRepository } from '../../repositories/IAffectedRepository';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';
import { Affected } from '../../domain/affected/affected';
import { AppError } from 'src/core/logic/error';

@Injectable()
export class CreateAffected {
  constructor(private affectedRepository: AffectedRepository) {}

  async execute(data: CreateAffectedDTO) {
    const affectedExists = await this.affectedRepository.findByCPF(
      data.cpf,
      data.unidadeHabitacionalId,
    );

    if (affectedExists) {
      throw new AppError('CPF já cadastrado');
    }

    const affected = new Affected({ ...data });

    return await this.affectedRepository.save(affected);
  }
}
