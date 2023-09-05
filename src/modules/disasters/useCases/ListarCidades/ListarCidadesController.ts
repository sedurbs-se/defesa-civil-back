import { ListarCidades } from './ListarCidades';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ListarCidadesController {
  constructor(private readonly listarCidades: ListarCidades) {}

  @Get('/cities')
  async execute() {
    const cities = await this.listarCidades.execute();

    return cities.map((city) => ({
      id: city.id,
      name: city.nome,
    }));
  }
}
