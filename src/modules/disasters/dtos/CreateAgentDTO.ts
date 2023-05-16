import { IsNotEmpty } from 'class-validator';

export abstract class CreateAgentDTO {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  cpf: string;
  @IsNotEmpty({ message: 'O campo função é obrigatório' })
  function: string;
  @IsNotEmpty({ message: 'O campo contato é obrigatório' })
  contact: string;
//   @IsNotEmpty({ message: 'O campo fl_lider_equipe é obrigatório' })
//   fl_lider_equipe: boolean;
}
