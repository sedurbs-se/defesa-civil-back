import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListarDesastres } from './ListarDesastres';
import { RolesGuard } from 'src/core/guards/roles.guard';

// @UseGuards(RolesGuard)
@Controller()
export class ListDisastersController {
  constructor(private readonly listarDesastres: ListarDesastres) {}
  @Get('/disasters')
  async execute() {
    const disasters = await this.listarDesastres.execute();
    return disasters.map((d) => ({
      id: d.id,
      date: d.date,
      cityId: d.cityId,
      city: {
        id: d.city.id,
        name: d.city.name,
      },
      areas: d.affectedAreas.map((a) => ({
        disaster_id: d.id,
        id: a.id,
        name: a.name,
        housingUnits: a.housingUnits.map((h) => ({
          id: h.id,
          order: h.order,
          affectedAreaId: h.affectedAreaId,
          address: h.address,
          coordinates: h.coordinates,
          // fotos:

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
