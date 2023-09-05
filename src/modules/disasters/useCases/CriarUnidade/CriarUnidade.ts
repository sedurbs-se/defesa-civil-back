import { AppError } from 'src/core/logic/error';
import { UnidadeHabitacional } from '../../domain/unidadeHabitacional/unidade-habitacional';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { UnidadeHabitacionalRepository } from '../../repositories/UnidadeHabitacionalRepository';
import { Injectable } from '@nestjs/common';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';

@Injectable()
class CriarUnidade {
  constructor(
    private housingUnitRepository: UnidadeHabitacionalRepository,
    private affectedAreaRepository: AreaAfetadaRepository,
  ) {}

  async execute(data: CreateHousingUnitDTO): Promise<UnidadeHabitacional> {
    const existArea = await this.affectedAreaRepository.find(
      data.affectedAreaId,
    );

    if (!existArea) throw new AppError('Area not found');

    const housingUnit = new UnidadeHabitacional({
      ordem: existArea.unidadesHabitacionais.length + 1,
      areaAfetadaId: data.affectedAreaId,
      coordenadas: data.coordinates,
      endereco: data.address,
      fl_danificado: data.fl_danificado,
      fl_desabrigado: data.fl_desabrigado,
      fl_desalojado: data.fl_desalojado,
      fl_destroido: data.fl_destroido,
      fl_resiliente: data.fl_resiliente,
      fl_resistente: data.fl_resistente,
    });

    await this.housingUnitRepository.save(housingUnit);

    return housingUnit;
  }
}

export { CriarUnidade };
