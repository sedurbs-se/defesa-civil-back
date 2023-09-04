import { Injectable } from '@nestjs/common';
import { AffectedRepository } from '../../repositories/IAffectedRepository';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';
import { Affected } from '../../domain/affected/affected';
import { AppError } from 'src/core/logic/error';

@Injectable()
export class UpdateAffected {
  constructor(private affectedRepository: AffectedRepository) {}

  async execute(data: CreateAffectedDTO, id: string) {
    const affectedExists = await this.affectedRepository.find(id);

    if (!affectedExists) {
      throw new AppError('Afetado não existe');
    }

    const affectedExistsByCPF = await this.affectedRepository.findByCPF(
      data.cpf,
      data.unidadeHabitacionalId,
    );

    if (affectedExistsByCPF && affectedExistsByCPF.id !== id) {
      throw new AppError('CPF já cadastrado');
    }

    const affected = new Affected({
      id: id,
      ...data,
    });

    return await this.affectedRepository.update(affected);
  }
}
