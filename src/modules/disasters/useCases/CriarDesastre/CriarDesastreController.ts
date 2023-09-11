import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CriarDesastre } from './CriarDesastre';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { CARGOS } from '../../domain/usuario/usuario';
import { User } from 'src/core/decorators/user.decorator';
import { Usuario } from '@prisma/client';

@UseGuards(RolesGuard)
@Controller()
export class CriarDesastreController {
  constructor(private readonly criarDesastre: CriarDesastre) {}

  @Post('/disaster')
  @Roles(CARGOS.AGENT)
  async execute(@Body() body: CreateDisasterDTO, @User() user: Usuario) {
    const d = await this.criarDesastre.execute({
      ...body,
      id_usuario: user.id,
    });

    return {
      id: d.id,
      date: d.data,
      cityId: d.cidadeId,
    };
  }
}
