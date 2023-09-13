import { Desastre } from '../../domain/desastre/desastre';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { CidadeRepository } from '../../repositories/CidadeRepository';
import { AppError } from 'src/core/logic/error';
import { Injectable } from '@nestjs/common';
import { AlteracaoRepository } from 'src/modules/historico/repositories/AlteracaoRepository';
import { Alteracao, TipoAlteracao } from 'src/modules/historico/domain/alteracao';

interface CreateDisasterDTOWithUserId extends CreateDisasterDTO {
  id_usuario: string;
}

@Injectable()
export class EditarDesastre {
  constructor(
    private disasterRepository: DesastreRepository,
    private cityRepository: CidadeRepository,
    private alteracaoRepository: AlteracaoRepository,
  ) {}

  async execute(request: CreateDisasterDTOWithUserId, id: string): Promise<Desastre> {
    const existDisaster = await this.disasterRepository.find(id);

    if (!existDisaster) throw new AppError('Desastre não encontrado!', 404);

    const city = await this.cityRepository.find(request.cityId);

    if (!city) throw new AppError('Município não encontrado!', 400);

    // salvar entidade com o id antigo
    const disaster = new Desastre({
      id: existDisaster.id,
      cidadeId: request.cityId,
      data: new Date(request.date),
    });

    await this.disasterRepository.update(disaster);

    // deletar entidade
    // modificar id
    const deleted = await this.disasterRepository.delete(existDisaster);

    const alteracao = new Alteracao({
      antigo_id: deleted.id,
      novo_id: disaster.id,
      tipo: TipoAlteracao.UPDATE,
      id_usuario: request.id_usuario,
      createdAt: new Date(),
      tabela: 'DESASTRE',
    });

    await this.alteracaoRepository.save(alteracao);
    

    return disaster;
  }
}
