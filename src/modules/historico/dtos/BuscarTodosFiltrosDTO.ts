import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export abstract class BuscarTodosFiltrosDTO {
  @IsOptional()
  id_usuario?: string;

  @IsOptional()
  tipo?: string;

  @IsNotEmpty({ message: 'O campo de pagina não pode ser vazio!' })
  @IsNumber()
  pagina: number;
  @IsNotEmpty({ message: 'O campo de limite não pode ser vazio!' })
  @IsNumber()
  limite: number;
}


