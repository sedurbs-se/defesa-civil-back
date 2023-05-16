import { IsNotEmpty } from 'class-validator';

export abstract class LoginDTO {

  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  cpf: string;


}
