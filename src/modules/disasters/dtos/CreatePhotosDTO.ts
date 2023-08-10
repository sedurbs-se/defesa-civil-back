import { IsNotEmpty } from 'class-validator';
import { PhotoType } from '../photoEnum';

export class CreatePhotosDTO {
  type: PhotoType;
}
