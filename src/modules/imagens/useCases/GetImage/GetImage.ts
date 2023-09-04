import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../../repositories/ImageRepository';
import { Image } from '../../domain/image';

@Injectable()
export class GetImage {
  constructor(private readonly imageRepository: ImageRepository) {}

  async execute(id: string): Promise<Image> {
    return await this.imageRepository.find(id);
  }
}
