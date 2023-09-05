import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export abstract class RegisterActionDTO {
  @ApiPropertyOptional({
    description:
      'O id da ação, caso não seja informado, será gerado um novo id.',
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'O id da unidade habitacional que a ação pertence.',
  })
  @ValidateIf((o) => o.context === 'unit')
  @IsNotEmpty({ message: 'A ação precisa ter uma unidade habitacional!' })
  housingUnitId: string;

  @ValidateIf((o) => o.context === 'area')
  @IsNotEmpty({ message: 'A ação precisa ter uma área afetada!' })
  affectedAreaId: string;

  @IsNotEmpty({ message: 'A ação precisa ter um tipo!' })
  typeId: string;

  @IsNotEmpty({ message: 'A ação precisa ter um contexto! (unit ou area)' })
  context: string;
}