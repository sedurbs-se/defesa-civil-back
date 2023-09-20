import { IsInt, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export abstract class BuscarTodosFiltrosDTO {
  @IsOptional()
  id_usuario?: string;

  @IsOptional()
  tipo?: string;

  @IsOptional()
  tabela?: string;

  @IsNotEmpty({ message: 'O campo de item_id não pode ser vazio!' })
  item_id: string;

  @IsNotEmpty({ message: 'O campo de pagina não pode ser vazio!' })
  @IsNumberString()
  pagina: number;
  
  @IsNotEmpty({ message: 'O campo de limite não pode ser vazio!' })
  @IsNumberString()
  limite: number;
}
