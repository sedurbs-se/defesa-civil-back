import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class RegisterTaskDTO {
  @ApiPropertyOptional({
    description:
      'O id da tarefa, caso não seja informado, será gerado um novo id.',
  })
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'A tarefa precisa pertencer a uma acao!' })
  actionId: string;

  @IsNotEmpty({ message: 'A tarefa precisa ter um nome!' })
  name: string;

  @IsOptional()
  quantificable: boolean;

  @IsOptional()
  basicItemId: string;
}
