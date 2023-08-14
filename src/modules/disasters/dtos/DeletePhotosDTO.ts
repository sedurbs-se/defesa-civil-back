import { IsArray, IsNotEmpty } from 'class-validator';

export class DeletePhotosDTO {
  @IsNotEmpty({ message: 'O campo de deletedIds é obrigatório' })
  @IsArray({ message: 'O campo de deletedIds deve ser um array' })
  deletedIds: string[];
}
