import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';
import {
  UnidadeHabitacional,
  UnidadeHabitacionalProps,
} from '../../domain/unidadeHabitacional/unidade-habitacional';
import { UnidadeHabitacionalRepository } from '../../repositories/UnidadeHabitacionalRepository';
import { Injectable } from '@nestjs/common';
import { AlteracaoRepository } from 'src/modules/historico/repositories/AlteracaoRepository';
import {
  Alteracao,
  AlteracaoTable,
  TipoAlteracao,
} from 'src/modules/historico/domain/alteracao';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';

interface CreateDisasterDTOWithUserId extends CreateHousingUnitDTO {
  id_usuario: string;
}

@Injectable()
class EditarUnidade {
  constructor(
    private unidadeRepository: UnidadeHabitacionalRepository,
    private alteracaoRepository: AlteracaoRepository,
  ) {}

  async execute(
    request: CreateDisasterDTOWithUserId,
    id: string,
  ): Promise<UnidadeHabitacional> {
    const housingUnit = await this.unidadeRepository.find(id);

    if (!housingUnit) {
      throw new Error('Housing Unit not found');
    }

    const data = { ...housingUnit, ...request };

    const updatedHousingUnit = new UnidadeHabitacional( {
      ordem: data.props.ordem,
      areaAfetadaId: data.affectedAreaId,
      coordenadas: data.coordinates,
      endereco: data.address,
      status_familia: data.status_familia,
      status_habitacao: data.status_habitacao,
    });

    await this.unidadeRepository.update(updatedHousingUnit);

    const deleted = await this.unidadeRepository.delete(housingUnit);

    const alteracao = new Alteracao({
      antigo_id: deleted.id,
      novo_id: updatedHousingUnit.id,
      item_id: updatedHousingUnit.id,
      tipo: TipoAlteracao.UPDATE,
      id_usuario: request.id_usuario,
      createdAt: new Date(),
      tabela: AlteracaoTable.UNIDADE_HABITACIONAL,
    });

    await this.alteracaoRepository.save(alteracao);
    return updatedHousingUnit;
  }
}

export { EditarUnidade };
