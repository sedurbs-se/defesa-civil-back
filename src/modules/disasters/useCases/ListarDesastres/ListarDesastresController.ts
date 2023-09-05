import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListarDesastres } from './ListarDesastres';
import { RolesGuard } from 'src/core/guards/roles.guard';

// @UseGuards(RolesGuard)
@Controller()
export class ListarDesastresController {
  constructor(private readonly listarDesastres: ListarDesastres) {}
  @Get('/disasters')
  async execute() {
    const disasters = await this.listarDesastres.execute();
    return disasters.map((d) => ({
      id: d.id,
      date: d.data,
      cityId: d.cidadeId,
      city: {
        id: d.cidade.id,
        name: d.cidade.nome,
      },
      areas: d.areasAfetadas.map((a) => ({
        disaster_id: d.id,
        id: a.id,
        name: a.nome,
        housingUnits: a.unidadesHabitacionais.map((h) => ({
          id: h.id,
          order: h.ordem,
          affectedAreaId: h.areaAfetadaId,
          address: h.endereco,
          coordinates: h.coordenadas,
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
