import { Controller, Get, Param } from '@nestjs/common';
import { ObterUnidade } from './ObterUnidade';
import { PhotoType } from '../../photoEnum';

@Controller()
export class ObterUnidadeController {
  constructor(private readonly obterUnidade: ObterUnidade) {}

  @Get('/housing-unit/:unit_id')
  async execute(@Param('unit_id') unit_id: string) {
    const housing = await this.obterUnidade.execute(unit_id);

    const fotos = housing.fotos
      .filter((p) => p.type === PhotoType.FOTO)
      .map((p) => ({ id: p.id, type: p.type, url: p.url }));

    const planilha = housing.fotos.find((p) => p.type === PhotoType.PLANILHA);
    return {
      id: housing.id,
      order: housing.ordem,
      affectedAreaId: housing.areaAfetadaId,
      address: housing.endereco,
      coordinates: housing.coordenadas,
      affecteds: housing.afetados.map((a) => ({
        id: a.id,
        name: a.nome,
        age: a.idade,
        sex: a.sexo,
        contact: a.contato,
        fl_chefe_familia: a.fl_chefe_familia,
        unidadeHabitacionalId: a.unidadeHabitacionalId,
      })),
      fotos,
      planilha: planilha
        ? { id: planilha.id, type: planilha.type, url: planilha.url }
        : null,

      fl_danificado: housing.fl_danificado,
      fl_desabrigado: housing.fl_desabrigado,
      fl_desalojado: housing.fl_desalojado,
      fl_destroido: housing.fl_destroido,
      fl_resiliente: housing.fl_resiliente,
      fl_resistente: housing.fl_resistente,
    };
  }
}
