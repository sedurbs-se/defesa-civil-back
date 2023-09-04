import { Controller, Get, Param } from '@nestjs/common';
import { ObterUnidade } from './ObterUnidade';
import { PhotoType } from '../../photoEnum';

@Controller()
export class GetHousingUnitController {
  constructor(private readonly obterUnidade: ObterUnidade) {}

  @Get('/housing-unit/:unit_id')
  async execute(@Param('unit_id') unit_id: string) {
    const housing = await this.obterUnidade.execute(unit_id);

    const fotos = housing.photos
      .filter((p) => p.type === PhotoType.FOTO)
      .map((p) => ({ id: p.id, type: p.type, url: p.url }));

    const planilha = housing.photos.find((p) => p.type === PhotoType.PLANILHA);
    return {
      id: housing.id,
      order: housing.order,
      affectedAreaId: housing.affectedAreaId,
      address: housing.address,
      coordinates: housing.coordinates,
      affecteds: housing.affecteds.map((a) => ({
        id: a.id,
        name: a.name,
        age: a.age,
        sex: a.sex,
        contact: a.contact,
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
