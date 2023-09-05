import { AppError } from 'src/core/logic/error';
import { UnidadeHabitacionalRepository } from '../../repositories/UnidadeHabitacionalRepository';
import { FotosRepository } from '../../repositories/FotosRepository';
import { Fotos } from '../../domain/fotos/fotos';
import { Injectable } from '@nestjs/common';
import { PhotoType } from '../../photoEnum';

@Injectable()
export class CriarFotos {
  constructor(
    private housingRepository: UnidadeHabitacionalRepository,
    private photoRepository: FotosRepository,
  ) {}

  async execute(
    unidade_habitacional_id: string,
    links: string[],
    type: PhotoType,
  ) {
    const housing = await this.housingRepository.find(unidade_habitacional_id);

    if (!housing) {
      throw new AppError('Housing not found');
    }

    const photos = [];

    for (const link of links) {
      const photo = new Fotos({
        unidadeHabitacionalId: unidade_habitacional_id,
        url: link,
        type: type,
      });
      photos.push(photo);
    }

    await this.photoRepository.save(photos);
  }
}
