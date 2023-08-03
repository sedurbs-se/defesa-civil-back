import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export abstract class LoginDTO {

  @ApiProperty({
    description: 'O cpf do agente',
  })
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  cpf: string;


}
