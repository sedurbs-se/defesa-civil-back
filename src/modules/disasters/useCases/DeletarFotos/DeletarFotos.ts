import { PhotosRepository } from '../../repositories/IPhotosRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletarFotos {
  constructor(private photoRepository: PhotosRepository) {}

  async execute(deletedIds: string[]) {
    await this.photoRepository.delete(deletedIds);
  }
}
