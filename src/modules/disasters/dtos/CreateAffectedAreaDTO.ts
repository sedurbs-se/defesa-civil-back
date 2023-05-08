import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class CreateAffectedAreaDTO {
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'A area precisa ter um desastre!' })
  disasterId: string;

  @IsNotEmpty({ message: 'O campo de ordem não pode ser vazio!' })
  order: number;
  
  @IsNotEmpty({ message: 'O campo de nome não pode ser vazio!' })
  name: string;
}
