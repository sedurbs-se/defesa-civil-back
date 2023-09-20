import { Desastre } from '../../domain/desastre/desastre';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { CidadeRepository } from '../../repositories/CidadeRepository';
import { AppError } from 'src/core/logic/error';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlteracaoRepository } from 'src/modules/historico/repositories/AlteracaoRepository';
import {
  Alteracao,
  AlteracaoTable,
  TipoAlteracao,
} from 'src/modules/historico/domain/alteracao';
import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';

interface CreateDisasterDTOWithUserId extends CreateDisasterDTO {
  id_usuario: string;
}

@Injectable()
export class CriarDesastre {
  constructor(
    private disasterRepository: DesastreRepository,
    private cityRepository: CidadeRepository,
    private alteracaoRepository: AlteracaoRepository,
  ) {}

  async execute(request: CreateDisasterDTOWithUserId): Promise<Desastre> {
    const city = await this.cityRepository.find(request.cityId);

    if (!city) throw new AppError('Município não encontrado!', 400);

    const disaster = new Desastre({
      id: uuidv4(),
      cidadeId: request.cityId,
      data: new Date(request.date),
    });

    await this.disasterRepository.save(disaster);

    const alteracao = new Alteracao({
      antigo_id: null,
      novo_id: disaster.id,
      item_id: disaster.id,
      tipo: TipoAlteracao.CREATE,
      id_usuario: request.id_usuario,
      createdAt: new Date(),
      tabela: AlteracaoTable.DESASTRE,
      // id_usuario: request.userId,
    });

    await this.alteracaoRepository.save(alteracao);
    
    return disaster;
  }
}
