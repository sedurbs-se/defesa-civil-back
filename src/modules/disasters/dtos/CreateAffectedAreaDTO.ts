import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';

export abstract class CreateAffectedAreaDTO {
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'A area precisa ter um desastre!' })
  disasterId: string;

  @IsNotEmpty({ message: 'O campo de ordem não pode ser vazio!' })
  @IsNumber()
  order: number;
  
  @IsNotEmpty({ message: 'O campo de nome não pode ser vazio!' })
  name: string;
}
