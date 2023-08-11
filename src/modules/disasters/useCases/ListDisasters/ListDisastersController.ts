import { Controller, Get } from '@nestjs/common';
import { ListDisasters } from './ListDisasters';

@Controller()
export class ListDisastersController {
  constructor(private readonly listDisasters: ListDisasters) {}

  @Get('/disasters')
  async execute() {
    const disasters = await this.listDisasters.execute();
    return disasters.map((d) => ({
      id: d.id,
      date: d.date,
      cityId: d.cityId,
      city: {
        id: d.city.id,
        name: d.city.name,
      },
      areas: d.affectedAreas.map((a) => ({
        id: a.id,
        name: a.name,
        housingUnits: a.housingUnits.map((h) => ({
          id: h.id,
          order: h.order,
          affectedAreaId: h.affectedAreaId,
          address: h.address,
          coordinates: h.coordinates,
          // fotos:
          fl_sos: h.fl_sos,
          qtd_familias: h.qtd_familias,
          qtd_adultos: h.qtd_adultos,
          qtd_adolescente: h.qtd_adolescente,
          qtd_criancas: h.qtd_criancas,
          qtd_homens: h.qtd_homens,
          qtd_idosos: h.qtd_idosos,
          qtd_mulheres: h.qtd_mulheres,
          qtd_pessoas: h.qtd_pessoas,
          fl_danificado: h.fl_danificado,
          fl_desabrigado: h.fl_desabrigado,
          fl_desalojado: h.fl_desalojado,
          fl_destroido: h.fl_destroido,
          fl_resiliente: h.fl_resiliente,
          fl_resistente: h.fl_resistente,
        })),
      })),
    }));
  }
}
