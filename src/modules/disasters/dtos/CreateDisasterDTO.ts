import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class CreateDisasterDTO {
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'O desastre precisa ter um municipio!' })
  cityId: string;

  @IsNotEmpty({ message: 'O campo de data não pode ser vazio!' })
  date: Date;
}
