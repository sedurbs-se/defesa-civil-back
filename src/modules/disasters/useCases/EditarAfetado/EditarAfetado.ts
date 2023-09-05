import { Injectable } from '@nestjs/common';
import { AfetadoRepository } from '../../repositories/AfetadoRepository';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';
import { Afetado } from '../../domain/afetado/afetado';
import { AppError } from 'src/core/logic/error';

@Injectable()
export class EditarAfetado {
  constructor(private affectedRepository: AfetadoRepository) {}

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

    const affected = new Afetado({
      id: id,
      contato: data.contact,
      cpf: data.cpf,
      idade: data.age,
      nome: data.name,
      sexo: data.sex,
      unidadeHabitacionalId: data.unidadeHabitacionalId,
      fl_chefe_familia: data.fl_chefe_familia,
    });

    return await this.affectedRepository.update(affected);
  }
}
