import { Injectable } from '@nestjs/common';
import { AreaAfetada } from '../../domain/areaAfetada/area-afetada';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import { AppError } from 'src/core/logic/error';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { DesastreRepository } from '../../repositories/DesastreRepository';

@Injectable()
class CriarAreaAfetada {
  constructor(
    private affectedAreaRepository: AreaAfetadaRepository,
    private disasterRepository: DesastreRepository,
  ) {}

  async execute(request: CreateAffectedAreaDTO): Promise<AreaAfetada> {
    const existDisaster = await this.disasterRepository.find(
      request.disasterId,
    );

    if (!existDisaster) throw new AppError('Disaster not found');

    const affectedArea = new AreaAfetada({
      desastreId: request.disasterId,
      nome: request.name,
      ordem: existDisaster.areasAfetadas.length + 1,
    });

    await this.affectedAreaRepository.save(affectedArea);

    return affectedArea;
  }
}

export { CriarAreaAfetada };
