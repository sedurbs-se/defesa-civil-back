import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist';

export abstract class CreateDisasterDTO {
  @ApiPropertyOptional({
    description: 'O id do desastre, caso não seja informado, será gerado um novo id.',
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'O id do municipio que o desastre ocorreu. Os municipios são cadastrados no sistema e há um endpoint para eles',
  })
  @IsNotEmpty({ message: 'O desastre precisa ter um municipio!' })
  cityId: string;

  @ApiProperty({
    description: 'A data do desastre. Deve ser informada no formato ISO 8601',
  })
  @IsNotEmpty({ message: 'O campo de data não pode ser vazio!' })
  @IsDateString()
  date: Date;
}
