import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class RegisterEventDTO {
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'O evento precisa pertencer a uma tarefa!' })
  taskId: string;

  @IsNotEmpty({ message: 'O evento precisa ter uma descricao!' })
  description: string;

  @IsNotEmpty({ message: 'O evento precisa ter um tipo!' })
  eventTypeId: string;

  @IsNotEmpty({ message: 'O evento precisa ter uma foto!' })
  photoId: string;

  @IsOptional()
  quantity: number;
}
