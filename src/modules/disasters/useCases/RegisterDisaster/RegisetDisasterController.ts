import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDisaster } from './RegisterDisaster';

interface RegisterDisasterDTO {
    endereco: string,
    municipio: string,
    evento: string,
    data: Date,
    agenteId: string,
    areasAfetadas?: {
        nome: string,
        coordenadas: number[],
        endereco: string,
        unidadesHabitacionais?: {
            familias: {
                unidadeHabitacionalId: string,
                afetados: {
                    nome: string,
                    cpf: string,
                    idade: number,
                    sexo: string,
                    contato: string,
                    temAguaPotavel: boolean,
                    temEletricidade: boolean,
                    podeCozinhar: boolean,
                    EmParenteOuCasaDeAmigos: boolean,
                    EmAbrigoPublico: boolean,
                    exAguaPotavel: string,
                    exEletricidade: string,
                    exParenteOuCasaDeAmigos: string,
                    exAbrigoPublico: string
                }[]
            }[]
        }[]
    }[]
}
    


@Controller()
export class AppController {
  constructor(private readonly registerDisaster: RegisterDisaster) {}

  @Post('/disaster')
  async execute(
    @Body() registerDisasterDTO: RegisterDisasterDTO,
  ): Promise<UserModel> {
    return this.registerDisaster.execute({});
  }
}
