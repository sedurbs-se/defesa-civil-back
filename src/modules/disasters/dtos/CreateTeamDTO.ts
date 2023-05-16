import { IsNotEmpty } from "class-validator";


export abstract class CreateTeamDTO {

    @IsNotEmpty({ message: 'O campo de nome é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'O campo de contato é obrigatório' })
    contact: string;

    @IsNotEmpty({ message: 'O campo de função é obrigatório' })
    function: string;

    @IsNotEmpty({ message: 'É obrigatório selecionar uma área afetada' })
    affectedAreaId: string;

    @IsNotEmpty({ message: 'O campo de líder é obrigatório' })
    leaderId: string;
    
    @IsNotEmpty({ message: 'O campo de agentes é obrigatório' })
    agents: string[];
}