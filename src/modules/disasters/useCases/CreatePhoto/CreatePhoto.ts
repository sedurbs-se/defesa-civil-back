import { AppError } from 'src/core/logic/error';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';
import { PhotosRepository } from '../../repositories/IPhotosRepository';
import { Photos } from '../../domain/photos/photos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePhoto {
  constructor(
    private housingRepository: HousingUnitRepository,
    private photoRepository: PhotosRepository,
  ) {}

  async execute(unidade_habitacional_id: string, link: string) {
    const housing = await this.housingRepository.find(unidade_habitacional_id);

    if (!housing) {
      throw new AppError('Housing not found');
    }
    
    const photo = new Photos({
      unidadeHabitacionalId: unidade_habitacional_id,
      url: link,
    });

    await this.photoRepository.save(photo);
  }
}
