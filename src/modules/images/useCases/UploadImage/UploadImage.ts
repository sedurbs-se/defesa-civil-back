import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../../repositories/ImageRepository';
import { Image } from '../../domain/image';

@Injectable()
export class UploadImage {
  constructor(private readonly imageRepository: ImageRepository) {}

  async execute(image: Image): Promise<Image> {
    return await this.imageRepository.save(image);
  }
}
