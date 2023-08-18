import { AppError } from 'src/core/logic/error';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';
import { PhotosRepository } from '../../repositories/IPhotosRepository';
import { Photos } from '../../domain/photos/photos';
import { Injectable } from '@nestjs/common';
import { PhotoType } from '../../photoEnum';

@Injectable()
export class DeletePhotos {
  constructor(private photoRepository: PhotosRepository) {}

  async execute(deletedIds: string[]) {
    await this.photoRepository.delete(deletedIds);
  }
}
