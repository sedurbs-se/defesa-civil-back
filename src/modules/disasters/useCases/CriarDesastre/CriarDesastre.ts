import { Desastre } from '../../domain/desastre/desastre';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { CidadeRepository } from '../../repositories/CidadeRepository';
import { AppError } from 'src/core/logic/error';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CriarDesastre {
  constructor(
    private disasterRepository: DesastreRepository,
    private cityRepository: CidadeRepository,
  ) {}

  async execute(request: CreateDisasterDTO): Promise<Desastre> {
    const city = await this.cityRepository.find(request.cityId);

    if (!city) throw new AppError('Município não encontrado!', 400);

    const disaster = new Desastre({
      id: uuidv4(),
      cidadeId: request.cityId,
      data: new Date(request.date),
    });

    await this.disasterRepository.save(disaster);

    return disaster;
  }
}
