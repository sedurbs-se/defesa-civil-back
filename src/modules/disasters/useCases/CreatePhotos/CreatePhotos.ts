import { AppError } from 'src/core/logic/error';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';
import { PhotosRepository } from '../../repositories/IPhotosRepository';
import { Photos } from '../../domain/photos/photos';
import { Injectable } from '@nestjs/common';
import { PhotoType } from '../../photoEnum';

@Injectable()
export class CreatePhotos {
  constructor(
    private housingRepository: HousingUnitRepository,
    private photoRepository: PhotosRepository,
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
      const photo = new Photos({
        unidadeHabitacionalId: unidade_habitacional_id,
        url: link,
        type: type,
      });
      photos.push(photo);
    }

    await this.photoRepository.save(photos);
  }
}
