import { Desastre } from '../../domain/desastre/desastre';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { CidadeRepository } from '../../repositories/CidadeRepository';
import { AppError } from 'src/core/logic/error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EditarDesastre {
  constructor(
    private disasterRepository: DesastreRepository,
    private cityRepository: CidadeRepository,
  ) {}

  async execute(request: CreateDisasterDTO, id: string): Promise<Desastre> {
    const existDisaster = await this.disasterRepository.find(id);

    if (!existDisaster) throw new AppError('Desastre não encontrado!', 404);

    const city = await this.cityRepository.find(request.cityId);

    if (!city) throw new AppError('Município não encontrado!', 400);

    const disaster = new Desastre({
      id: existDisaster.id,
      cidadeId: request.cityId,
      data: new Date(request.date),
    });

    await this.disasterRepository.update(disaster);

    return disaster;
  }
}
