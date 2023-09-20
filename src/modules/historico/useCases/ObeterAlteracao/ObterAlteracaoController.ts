import { Controller, Get, Param } from '@nestjs/common';
import { BuscarTodosFiltrosDTO } from '../../dtos/BuscarTodosFiltrosDTO';
import { ObterAlteracao } from './ObterAlteracao';

@Controller()
export class ObterAlteracaoController {
  constructor(private readonly service: ObterAlteracao) {}
  @Get('/alteracao/:id')
  async execute(@Param('id') id: string) {
    const a = await this.service.execute(id);
    return  {
        id: a.id,
        id_usuario: a.id_usuario,
        usuario: {
          nome: a.usuario.nome,
          cpf: a.usuario.cpf,
          funcao: a.usuario.agente.funcao,
        },
        antigo: a.antigo,
        novo: a.novo,
        tipo: a.tipo,
        tabela: a.tabela,
        antigo_id: a.antigo_id,
        novo_id: a.novo_id,
        createdAt: a.createdAt,
    }
  }
}
