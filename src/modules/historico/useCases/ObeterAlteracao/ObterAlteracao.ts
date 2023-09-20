import { Injectable } from '@nestjs/common';
import { AlteracaoRepository } from '../../repositories/AlteracaoRepository';
import { BuscarTodosFiltrosDTO } from '../../dtos/BuscarTodosFiltrosDTO';

@Injectable()
export class ObterAlteracao {
  constructor(private readonly alteracaoRepository: AlteracaoRepository) {}

  async execute(id:string) {
    const alteracao = await this.alteracaoRepository.find(id)

    return alteracao;
  }
}
