import { Injectable } from '@nestjs/common';
import { AreaAfetada } from '../../domain/areaAfetada/area-afetada';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import { AppError } from 'src/core/logic/error';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { Alteracao, TipoAlteracao } from 'src/modules/historico/domain/alteracao';
import { AlteracaoRepository } from 'src/modules/historico/repositories/AlteracaoRepository';

interface CreateDisasterDTOWithUserId extends CreateAffectedAreaDTO {
  id_usuario: string;
}


@Injectable()
class CriarAreaAfetada {
  constructor(
    private affectedAreaRepository: AreaAfetadaRepository,
    private disasterRepository: DesastreRepository,
    private alteracaoRepository: AlteracaoRepository,
  ) {}

  async execute(request: CreateDisasterDTOWithUserId): Promise<AreaAfetada> {
    const existDisaster = await this.disasterRepository.find(
      request.disasterId,
    );

    if (!existDisaster) throw new AppError('Desastre não encontrado!', 404);

    const affectedArea = new AreaAfetada({
      desastreId: request.disasterId,
      nome: request.name,
      ordem: existDisaster.areasAfetadas.length + 1,
    });

    await this.affectedAreaRepository.save(affectedArea);

    const alteracao = new Alteracao({
      antigo_id: null,
      novo_id: affectedArea.id,
      item_id: affectedArea.id,
      tipo: TipoAlteracao.CREATE,
      id_usuario: request.id_usuario,
      createdAt: new Date(),
      tabela: 'AREA_AFETADA',
    });

    await this.alteracaoRepository.save(alteracao);

    return affectedArea;
  }
}

export { CriarAreaAfetada };
