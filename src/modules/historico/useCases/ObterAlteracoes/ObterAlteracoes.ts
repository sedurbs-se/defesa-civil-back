import { Injectable } from '@nestjs/common';
import { AlteracaoRepository } from '../../repositories/AlteracaoRepository';
import { BuscarTodosFiltrosDTO } from '../../dtos/BuscarTodosFiltrosDTO';

@Injectable()
export class ObterAlteracoes {
  constructor(private readonly alteracaoRepository: AlteracaoRepository) {}

  async execute(filtros: BuscarTodosFiltrosDTO) {
    const alteracoes = await this.alteracaoRepository.findAll({
      ...filtros,
      limite: Number(filtros.limite || 10),
      pagina: Number(filtros.pagina || 0),
    });
    return alteracoes;
  }
}
