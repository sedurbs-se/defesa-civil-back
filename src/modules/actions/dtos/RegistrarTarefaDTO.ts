import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class RegistrarTarefaDTO {
  @ApiPropertyOptional({
    description:
      'O id da tarefa, caso não seja informado, será gerado um novo id.',
  })
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'A tarefa precisa pertencer a uma acao!' })
  acaoId: string;

  @IsNotEmpty({ message: 'A tarefa precisa ter um nome!' })
  nome: string;

  @IsOptional()
  quantificavel: boolean;

  @IsOptional()
  itemBasicoId: string;
}
