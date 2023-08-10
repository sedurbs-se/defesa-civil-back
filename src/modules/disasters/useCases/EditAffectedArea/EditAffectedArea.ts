import { Injectable } from '@nestjs/common';
import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';
import { AffectedArea } from '../../domain/affectedArea/affected-area';
import { AffectedAreaRepository } from '../../repositories/IAffectedAreaRepository';
import { DisasterRepository } from '../../repositories/IDisasterRepository';
import { AppError } from 'src/core/logic/error';

type EditAffectedAreaRequest = OptionalExceptFor<AffectedArea, 'id'>;

@Injectable()
export class EditAffectedArea {
  constructor(
    private affectedAreaRepository: AffectedAreaRepository,
    private disasterRepository: DisasterRepository,
  ) {}

  async execute(request: EditAffectedAreaRequest): Promise<AffectedArea> {
    const existDisaster = await this.disasterRepository.find(
      request.disasterId,
    );

    if (!existDisaster) throw new AppError('Disaster not found');

    const existAffectedArea = await this.affectedAreaRepository.find(
      request.id,
    );

    if (!existAffectedArea) throw new AppError('Affected Area not found');

    const existAffectedAreaOrder =
      await this.affectedAreaRepository.findByOrder(request.order);

    if (existAffectedAreaOrder && existAffectedAreaOrder.id !== request.id)
      throw new AppError('Affected Area with selected order already exists');

    const updatedAffectedArea = new AffectedArea({
      disasterId: request.disasterId,
      name: request.name,
      order: request.order,
      id: request.id,
    });

    await this.affectedAreaRepository.update(updatedAffectedArea);

    return updatedAffectedArea;
  }
}
