import { IsNotEmpty, IsOptional } from 'class-validator';

export abstract class RegistrarEventoDTO {
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'O evento precisa pertencer a uma tarefa!' })
  tarefaId: string;

  @IsNotEmpty({ message: 'O evento precisa ter uma descricao!' })
  descricao: string;

  @IsNotEmpty({ message: 'O evento precisa ter um tipo!' })
  tipoEventoId: string;

  @IsNotEmpty({ message: 'O evento precisa ter uma foto!' })
  fotoId: string;

  @IsOptional()
  quantidade: number;
}
