import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListActions } from './ListActions';

@Controller()
export class ListActionsController {
  constructor(private readonly listActions: ListActions) {}

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
