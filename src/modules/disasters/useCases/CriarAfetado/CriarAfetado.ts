import { Injectable } from '@nestjs/common';
import { AfetadoRepository } from '../../repositories/AfetadoRepository';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';
import { Afetado } from '../../domain/afetado/afetado';
import { AppError } from 'src/core/logic/error';

@Injectable()
export class CreateAffected {
  constructor(private affectedRepository: AfetadoRepository) {}

  async execute(data: CreateAffectedDTO) {
    const affectedExists = await this.affectedRepository.findByCPF(
      data.cpf,
      data.unidadeHabitacionalId,
    );

    if (affectedExists) {
      throw new AppError('CPF já cadastrado');
    }

    const affected = new Afetado(affectedExists);

    return await this.affectedRepository.save(affected);
  }
}
