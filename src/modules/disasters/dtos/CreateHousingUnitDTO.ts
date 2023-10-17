import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusFamilia, StatusHabitacao } from '../domain/unidadeHabitacional/unidade-habitacional';

export abstract class CreateHousingUnitDTO {
  @IsNotEmpty({ message: 'O campo id da área afetada é obrigatório' })
  affectedAreaId: string;

  @IsNotEmpty({ message: 'O campo endereço é obrigatório' })
  address: string;

  @IsNotEmpty({ message: 'O campo coordenadas é obrigatório' })
  coordinates: string;

  @IsNotEmpty({ message: 'O campo status_habitacao é obrigatório' })
  @IsEnum(StatusHabitacao, { message: 'O campo status_habitacao deve ser um enum válido' })
  status_habitacao: StatusHabitacao;

  @IsNotEmpty({ message: 'O campo status_familia é obrigatório' })
  @IsEnum(StatusFamilia, { message: 'O campo status_familia deve ser um enum válido' })
  status_familia: StatusFamilia
}
