import { IsNotEmpty } from 'class-validator';

export abstract class CreateHousingUnitDTO {
  @IsNotEmpty({ message: 'O campo order é obrigatório' })
  order: number;

  @IsNotEmpty({ message: 'O campo id da área afetada é obrigatório' })
  affectedAreaId: string;

  @IsNotEmpty({ message: 'O campo endereço é obrigatório' })
  address: string;

  @IsNotEmpty({ message: 'O campo coordenadas é obrigatório' })
  coordinates: string;

  @IsNotEmpty({ message: 'O campo flag sos é obrigatória' })
  fl_sos: boolean;

  @IsNotEmpty({ message: 'O campo quantidade de famílias é obrigatório' })
  qtd_familias: number;

  @IsNotEmpty({ message: 'O campo quantidade de pessoas é obrigatório' })
  qtd_pessoas: number;

  @IsNotEmpty({ message: 'O campo quantidade de idosos é obrigatório' })
  qtd_idosos: number;

  @IsNotEmpty({ message: 'O campo quantidade de crianças é obrigatório' })
  qtd_criancas: number;

  @IsNotEmpty({ message: 'O campo quantidade de adultos é obrigatório' })
  qtd_adultos: number;

  @IsNotEmpty({ message: 'O campo quantidade de adolescentes é obrigatório' })
  qtd_adolescente: number;

  @IsNotEmpty({ message: 'O campo quantidade de homens é obrigatório' })
  qtd_homens: number;

  @IsNotEmpty({ message: 'O campo quantidade de mulheres é obrigatório' })
  qtd_mulheres: number;

  @IsNotEmpty({ message: 'O campo flag resistente é obrigatório' })
  fl_resistente: boolean;

  @IsNotEmpty({ message: 'O campo flag danificado é obrigatório' })
  fl_danificado: boolean;

  @IsNotEmpty({ message: 'O campo flag destruído é obrigatório' })
  fl_destroido: boolean;

  @IsNotEmpty({ message: 'O campo flag resiliente é obrigatório' })
  fl_resiliente: boolean;

  @IsNotEmpty({ message: 'O campo flag desabrigado é obrigatório' })
  fl_desabrigado: boolean;

  @IsNotEmpty({ message: 'O campo flag desalojado é obrigatório' })
  fl_desalojado: boolean;
}
