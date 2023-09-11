import { Controller, Get, UseGuards } from '@nestjs/common';
import { ListarDesastres } from './ListarDesastres';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AreaAfetada } from '../../domain/areaAfetada/area-afetada';
import { UnidadeHabitacional } from '../../domain/unidadeHabitacional/unidade-habitacional';

// @UseGuards(RolesGuard)
@Controller()
export class ListarDesastresController {
  constructor(private readonly listarDesastres: ListarDesastres) {}
  @Get('/disasters')
  async execute() {
    const disasters = await this.listarDesastres.execute();
    const areas: AreaAfetada[] = disasters.reduce((acc, cur) => {
      return [...acc, ...cur.areasAfetadas];
    }, []);

    const housingUnits: UnidadeHabitacional[] = areas.reduce((acc, cur) => {
      return [...acc, ...cur.unidadesHabitacionais];
    }, []);

    return {
      disasters: disasters.map((d) => ({
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
          order: a.ordem,
          housingUnits: a.unidadesHabitacionais.map((h) => ({
            id: h.id,
            order: h.ordem,
            affectedAreaId: h.areaAfetadaId,
            address: h.endereco,
            coordinates: h.coordenadas,
            idosos: h.afetados.filter((a) => a.obterGrupoIdade() === 'IDOSO').length,
            adultos: h.afetados.filter((a) => a.obterGrupoIdade() === 'ADULTO').length,
            criancas: h.afetados.filter((a) => a.obterGrupoIdade() === 'CRIANÇA').length,
            
            fl_danificado: h.fl_danificado,
            fl_desabrigado: h.fl_desabrigado,
            fl_desalojado: h.fl_desalojado,
            fl_destroido: h.fl_destroido,
            fl_resiliente: h.fl_resiliente,
            fl_resistente: h.fl_resistente,
          })),
        })),
      })),
      areas: areas.map((a) => ({
        id: a.id,
        name: a.nome,
        disaster_id: a.desastreId,
        order: a.ordem,
      })),
      housingUnits: housingUnits.map((h) => ({
        id: h.id,
        order: h.ordem,
        affectedAreaId: h.areaAfetadaId,
        address: h.endereco,
        coordinates: h.coordenadas,
        idosos: h.afetados.filter((a) => a.obterGrupoIdade() === 'IDOSO').length,
        adultos: h.afetados.filter((a) => a.obterGrupoIdade() === 'ADULTO').length,
        criancas: h.afetados.filter((a) => a.obterGrupoIdade() === 'CRIANÇA').length,
        fl_danificado: h.fl_danificado,
        fl_desabrigado: h.fl_desabrigado,
        fl_desalojado: h.fl_desalojado,
        fl_destroido: h.fl_destroido,
        fl_resiliente: h.fl_resiliente,
        fl_resistente: h.fl_resistente,
      })),
    };
  }
}
