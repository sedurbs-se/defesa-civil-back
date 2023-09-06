import { Controller, Get, Param } from '@nestjs/common';
import { ObterAcao } from './ObterAcao';

function getCodigoContexto(contexto, unidade, area) {
  if (contexto === 'unidade') {
    return `Unidade A${unidade.areaAfetada.ordem}/U${unidade.ordem}`;
  }
  return `Área A/${area.ordem}`;
}

@Controller()
export class ObterAcaoController {
  constructor(private readonly obterAcao: ObterAcao) {}

  @Get('/action/:id')
  async execute(@Param('id') id: string) {
    const action = await this.obterAcao.execute({ id });

    return {
      id: action.id,
      contexto: action.contexto,
      unidadeHabitacionalId: action.unidadeHabitacionalId,
      areaAfetadaId: action.areaAfetadaId,
      tipoId: action.tipoId,
      createdAt: action.createdAt,
      updatedAt: action.updatedAt,
      deletedAt: action.deletedAt,
      codigoContexto: getCodigoContexto(
        action.contexto,
        action.unidadeHabitacional,
        action.areaAfetada,
      ),
      tipo: {
        ...action.tipo.props,
      },
    };
  }
}
