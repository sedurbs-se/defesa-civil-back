import { Injectable } from '@nestjs/common';
import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';
import { AreaAfetada } from '../../domain/areaAfetada/area-afetada';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { AppError } from 'src/core/logic/error';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';

type EditarAreaAfetadaRequest = OptionalExceptFor<CreateAffectedAreaDTO, 'id'>;

@Injectable()
export class EditarAreaAfetada {
  constructor(
    private affectedAreaRepository: AreaAfetadaRepository,
    private disasterRepository: DesastreRepository,
  ) {}

  async execute(request: EditarAreaAfetadaRequest): Promise<AreaAfetada> {
    const existDisaster = await this.disasterRepository.find(
      request.disasterId,
    );

    if (!existDisaster) throw new AppError('Disaster not found');

    const existAffectedArea = await this.affectedAreaRepository.find(
      request.id,
    );

    if (!existAffectedArea) throw new AppError('Affected Area not found');

    const updatedAffectedArea = new AreaAfetada({
      desastreId: request.disasterId,
      nome: request.name,
      id: request.id,
      ordem: existAffectedArea.ordem,
    });

    await this.affectedAreaRepository.update(updatedAffectedArea);

    return updatedAffectedArea;
  }
}
