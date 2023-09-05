import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export abstract class CreateAgentDTO {
  @ApiProperty({
    description: 'O nome do agente que será cadastrado no sistema',
  })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;

  @ApiProperty({
    description:
      'O cpf do agente que será cadastrado no sistema e usado para login',
  })
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  cpf: string;

  @ApiProperty({
    description: 'A função que o agente executará',
  })
  @IsNotEmpty({ message: 'O campo função é obrigatório' })
  function: string;

  @ApiProperty({
    description: 'O contato do agente (Telefone, email, etc)',
  })
  @IsNotEmpty({ message: 'O campo contato é obrigatório' })
  contact: string;
  //   @IsNotEmpty({ message: 'O campo fl_lider_equipe é obrigatório' })
  //   fl_lider_equipe: boolean;
}
