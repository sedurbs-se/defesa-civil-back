import { Body, Controller, Post } from '@nestjs/common';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { RegisterHousing } from './RegisterHousingUnit';

@Controller()
export class RegisterHousingController {
  constructor(private readonly registerHousing: RegisterHousing) {}

  @Post('/housing-unit')
  async execute(@Body() body: CreateHousingUnitDTO) {
    const housingUnit = await this.registerHousing.execute(body);

    return {
      id: housingUnit.id,
      order: housingUnit.order,
      affectedAreaId: housingUnit.affectedAreaId,
      address: housingUnit.address,
      coordinates: housingUnit.coordinates,
      fl_sos: housingUnit.fl_sos,
      qtd_familias: housingUnit.qtd_familias,
      qtd_adultos: housingUnit.qtd_adultos,
      qtd_adolescente: housingUnit.qtd_adolescente,
      qtd_criancas: housingUnit.qtd_criancas,
      qtd_homens: housingUnit.qtd_homens,
      qtd_idosos: housingUnit.qtd_idosos,
      qtd_mulheres: housingUnit.qtd_mulheres,
      qtd_pessoas: housingUnit.qtd_pessoas,
      fl_danificado: housingUnit.fl_danificado,
      fl_desabrigado: housingUnit.fl_desabrigado,
      fl_desalojado: housingUnit.fl_desalojado,
      fl_destroido: housingUnit.fl_destroido,
      fl_resiliente: housingUnit.fl_resiliente,
      fl_resistente: housingUnit.fl_resistente,
    };
  }
}
