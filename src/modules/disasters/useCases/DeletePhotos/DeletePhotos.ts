import { PhotosRepository } from '../../repositories/IPhotosRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletePhotos {
  constructor(private photoRepository: PhotosRepository) {}

  async execute(deletedIds: string[]) {
    await this.photoRepository.delete(deletedIds);
  }
}
