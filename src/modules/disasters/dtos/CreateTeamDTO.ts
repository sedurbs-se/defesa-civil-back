import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";


export abstract class CreateTeamDTO {

    @ApiProperty({
        description: 'O nome que será dado a equipe',
    })
    @IsNotEmpty({ message: 'O campo de nome é obrigatório' })
    name: string;

    @ApiProperty({
        description: 'O contato da equipe (Telefone, email, etc)',
    })
    @IsNotEmpty({ message: 'O campo de contato é obrigatório' })
    contact: string;

    @ApiProperty({
        description: 'A função que a equipe executará',
    })
    @IsNotEmpty({ message: 'O campo de função é obrigatório' })
    function: string;

    @ApiProperty({
        description: 'O id da área na qual a equipe atuará',
    })
    @IsNotEmpty({ message: 'É obrigatório selecionar uma área afetada' })
    affectedAreaId: string;
 
    @ApiProperty({
        description: 'O id do líder da equipe (agente)',
    })
    @IsNotEmpty({ message: 'O campo de líder é obrigatório' })
    leaderId: string;
    
    @ApiProperty({
        description: 'Os ids dos agentes que compõem a equipe',
        type: [String]
    })
    @IsNotEmpty({ message: 'O campo de agentes é obrigatório' })
    agents: string[];
}