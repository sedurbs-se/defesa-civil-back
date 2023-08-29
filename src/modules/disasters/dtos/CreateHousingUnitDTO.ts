import { IsNotEmpty } from 'class-validator';

export abstract class CreateHousingUnitDTO {


  @IsNotEmpty({ message: 'O campo id da área afetada é obrigatório' })
  affectedAreaId: string;

  @IsNotEmpty({ message: 'O campo endereço é obrigatório' })
  address: string;

  @IsNotEmpty({ message: 'O campo coordenadas é obrigatório' })
  coordinates: string;

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
