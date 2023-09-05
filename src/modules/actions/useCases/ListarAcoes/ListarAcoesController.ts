import { Controller, Get, Query } from '@nestjs/common';
import { ListarAcoes } from './ListarAcoes';

@Controller()
export class ListarAcoesController {
  constructor(private readonly listActions: ListarAcoes) {}

  @Get('/action')
  async execute(@Query('a') a?: string, @Query('u') u?: string) {
    const options = {
      affectedAreaId: a,
      housingUnitId: u,
    };
    const actions = await this.listActions.execute(options);

    const actionsDTO = actions.map((action) => ({
      ...action.props,
    }));

    return {
      ok: true,
      result: actionsDTO,
    };
  }
}
