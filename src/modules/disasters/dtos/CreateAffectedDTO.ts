import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export abstract class CreateAffectedDTO {
  @ApiProperty({
    description: 'O nome do afetado que será cadastrado no sistema',
  })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'A idade do afetado que será cadastrado no sistema',
  })
  @IsNotEmpty({ message: 'O campo idade é obrigatório' })
  age: number;

  @ApiProperty({
    description: 'O sexo do afetado que será cadastrado no sistema',
  })
  @IsNotEmpty({ message: 'O campo sexo é obrigatório' })
  sex: string;
  
  @ApiProperty({
    description: 'O contato do afetado (Telefone, email, etc)',
  })
  @IsNotEmpty({ message: 'O campo contato é obrigatório' })
  contact: string;

  @ApiProperty({
    description:
      'O cpf do afetado que será cadastrado no sistema e usado para login',
  })
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  cpf: string;

  @ApiProperty({
    description: 'O campo fl_chefe_familia é obrigatório',
  })
  @IsNotEmpty({ message: 'O campo fl_chefe_familia é obrigatório' })
  fl_chefe_familia: boolean;

  @IsNotEmpty({ message: 'O campo unidadeHabitacionalId é obrigatório' })
  unidadeHabitacionalId: string;
}
