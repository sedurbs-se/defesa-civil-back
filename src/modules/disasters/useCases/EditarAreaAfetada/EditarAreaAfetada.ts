import { Injectable } from '@nestjs/common';
import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';
import { AffectedArea } from '../../domain/affectedArea/affected-area';
import { AffectedAreaRepository } from '../../repositories/IAffectedAreaRepository';
import { DisasterRepository } from '../../repositories/IDisasterRepository';
import { AppError } from 'src/core/logic/error';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';

type EditarAreaAfetadaRequest = OptionalExceptFor<CreateAffectedAreaDTO, 'id'>;

@Injectable()
export class EditarAreaAfetada {
  constructor(
    private affectedAreaRepository: AffectedAreaRepository,
    private disasterRepository: DisasterRepository,
  ) {}

  async execute(request: EditarAreaAfetadaRequest): Promise<AffectedArea> {
    const existDisaster = await this.disasterRepository.find(
      request.disasterId,
    );

    if (!existDisaster) throw new AppError('Disaster not found');

    const existAffectedArea = await this.affectedAreaRepository.find(
      request.id,
    );

    if (!existAffectedArea) throw new AppError('Affected Area not found');

    const updatedAffectedArea = new AffectedArea({
      disasterId: request.disasterId,
      name: request.name,
      id: request.id,
      order: existAffectedArea.order,
    });

    await this.affectedAreaRepository.update(updatedAffectedArea);

    return updatedAffectedArea;
  }
}
