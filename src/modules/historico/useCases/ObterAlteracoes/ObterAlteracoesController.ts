import { Controller, Get, Query } from '@nestjs/common';
import { ObterAlteracoes } from './ObterAlteracoes';
import { BuscarTodosFiltrosDTO } from '../../dtos/BuscarTodosFiltrosDTO';

@Controller()
export class ObterAlteracoesController {
  constructor(private readonly service: ObterAlteracoes) {}
  @Get('/historico')
  async execute(@Query() filtros: BuscarTodosFiltrosDTO) {
    const alteracoes = await this.service.execute(filtros);
    return alteracoes.map((h) => {
      return {
        id: h.id,
        id_usuario: h.id_usuario,
        usuario: {
          nome: h.usuario.nome,
          cpf: h.usuario.cpf,
          funcao: h.usuario.agente.funcao,
        },
        changes:[],
        tipo: h.tipo,
        tabela: h.tabela,
        antigo_id: h.antigo_id,
        novo_id: h.novo_id,
        createdAt: h.createdAt,
      };
    });
  }
}
