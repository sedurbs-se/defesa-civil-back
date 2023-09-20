import { AppError } from 'src/core/logic/error';
import { UnidadeHabitacional } from '../../domain/unidadeHabitacional/unidade-habitacional';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { UnidadeHabitacionalRepository } from '../../repositories/UnidadeHabitacionalRepository';
import { Injectable } from '@nestjs/common';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import {
  Alteracao,
  AlteracaoTable,
  TipoAlteracao,
} from 'src/modules/historico/domain/alteracao';
import { AlteracaoRepository } from 'src/modules/historico/repositories/AlteracaoRepository';

interface DTOWithUserId extends CreateHousingUnitDTO {
  id_usuario: string;
}

@Injectable()
class CriarUnidade {
  constructor(
    private housingUnitRepository: UnidadeHabitacionalRepository,
    private affectedAreaRepository: AreaAfetadaRepository,
    private alteracaoRepository: AlteracaoRepository,
    ) {}

  async execute(data: DTOWithUserId): Promise<UnidadeHabitacional> {
    const existArea = await this.affectedAreaRepository.find(
      data.affectedAreaId,
    );

    if (!existArea) throw new AppError('Area not found');

    const housingUnit = new UnidadeHabitacional({
      ordem: existArea.unidadesHabitacionais.length + 1,
      areaAfetadaId: data.affectedAreaId,
      coordenadas: data.coordinates,
      endereco: data.address,
      fl_danificado: data.fl_danificado,
      fl_desabrigado: data.fl_desabrigado,
      fl_desalojado: data.fl_desalojado,
      fl_destroido: data.fl_destroido,
      fl_resiliente: data.fl_resiliente,
      fl_resistente: data.fl_resistente,
    });

    await this.housingUnitRepository.save(housingUnit);

    const alteracao = new Alteracao({
      antigo_id: null,
      novo_id: housingUnit.id,
      item_id: housingUnit.id,
      tipo: TipoAlteracao.CREATE,
      id_usuario: data.id_usuario,
      createdAt: new Date(),
      tabela: AlteracaoTable.UNIDADE_HABITACIONAL,
    });

    await this.alteracaoRepository.save(alteracao);

    return housingUnit;
  }
}

export { CriarUnidade };
