import { Controller, Get, Param } from '@nestjs/common';
import { GetHousingUnit } from './GetHousingUnit';

@Controller()
export class GetHousingUnitController {
  constructor(private readonly getHousingUnit: GetHousingUnit) {}

  @Get('/housing-unit/:unit_id')
  async execute(@Param('unit_id') unit_id: string) {
    const housing = await this.getHousingUnit.execute(unit_id);

    return {
      id: housing.id,
      order: housing.order,
      areaAfetadaId: housing.affectedAreaId,
      endereco: housing.address,
      coordenadas: housing.coordinates,
      fotos: housing.photos.map((p) => ({
        id: p.id,
        url: p.url,
      })),
      fl_sos: housing.fl_sos,
      qtd_familias: housing.qtd_familias,
      qtd_adultos: housing.qtd_adultos,
      qtd_adolescente: housing.qtd_adolescente,
      qtd_criancas: housing.qtd_criancas,
      qtd_homens: housing.qtd_homens,
      qtd_idosos: housing.qtd_idosos,
      qtd_mulheres: housing.qtd_mulheres,
      qtd_pessoas: housing.qtd_pessoas,
      fl_danificado: housing.fl_danificado,
      fl_desabrigado: housing.fl_desabrigado,
      fl_desalojado: housing.fl_desalojado,
      fl_destroido: housing.fl_destroido,
      fl_resiliente: housing.fl_resiliente,
      fl_resistente: housing.fl_resistente,
    };
  }
}
