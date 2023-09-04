import { Body, Controller, Post } from '@nestjs/common';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { CriarUnidade } from './CriarUnidade';

@Controller()
export class CriarUnidadeController {
  constructor(private readonly criarUnidade: CriarUnidade) {}

  @Post('/housing-unit')
  async execute(@Body() body: CreateHousingUnitDTO) {
    const housingUnit = await this.criarUnidade.execute(body);

    return {
      id: housingUnit.id,
      order: housingUnit.ordem,
      affectedAreaId: housingUnit.areaAfetadaId,
      address: housingUnit.endereco,
      coordinates: housingUnit.coordenadas,
      fl_danificado: housingUnit.fl_danificado,
      fl_desabrigado: housingUnit.fl_desabrigado,
      fl_desalojado: housingUnit.fl_desalojado,
      fl_destroido: housingUnit.fl_destroido,
      fl_resiliente: housingUnit.fl_resiliente,
      fl_resistente: housingUnit.fl_resistente,
    };
  }
}
