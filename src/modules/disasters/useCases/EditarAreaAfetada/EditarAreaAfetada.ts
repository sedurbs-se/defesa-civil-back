import { Injectable } from '@nestjs/common';
import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';
import { AreaAfetada } from '../../domain/areaAfetada/area-afetada';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { AppError } from 'src/core/logic/error';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { Alteracao, TipoAlteracao } from 'src/modules/historico/domain/alteracao';
import { AlteracaoRepository } from 'src/modules/historico/repositories/AlteracaoRepository';

type EditarAreaAfetadaRequest = OptionalExceptFor<CreateAffectedAreaDTO, 'id'>;

interface EditarAreaDTOWithUserId extends EditarAreaAfetadaRequest {
  id_usuario: string;
}

@Injectable()
export class EditarAreaAfetada {
  constructor(
    private affectedAreaRepository: AreaAfetadaRepository,
    private disasterRepository: DesastreRepository,
    private alteracaoRepository: AlteracaoRepository,
  ) {}

  async execute(request: EditarAreaDTOWithUserId): Promise<AreaAfetada> {
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

    const deleted = await this.affectedAreaRepository.delete(existAffectedArea);

    const alteracao = new Alteracao({
      antigo_id: deleted.id,
      novo_id: updatedAffectedArea.id,
      tipo: TipoAlteracao.UPDATE,
      id_usuario: request.id_usuario,
      createdAt: new Date(),
      tabela: 'AREA_AFETADA',
    });

    await this.alteracaoRepository.save(alteracao);

    return updatedAffectedArea;
  }
}
