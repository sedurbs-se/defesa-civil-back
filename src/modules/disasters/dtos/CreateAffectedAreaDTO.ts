import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class CreateAffectedAreaDTO {
  @ApiPropertyOptional({
    description:
      'O id da área, caso não seja informado, será gerado um novo id.',
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'O id do desastre que a área pertence.',
  })
  @IsNotEmpty({ message: 'A area precisa ter um desastre!' })
  disasterId: string;

  @ApiProperty({
    description:
      'A ordem da área, consiste em um número inteiro que gerará uma sequência nas unidades habitacionais',
  })
  @ApiProperty({
    description: 'O nome da área. Normalmente se refere a um bairro',
  })
  @IsNotEmpty({ message: 'O campo de nome não pode ser vazio!' })
  name: string;
}
