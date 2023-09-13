import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { CriarAreaAfetada } from './CriarAreaAfetada';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Usuario } from '@prisma/client';
import { User } from 'src/core/decorators/user.decorator';
import { CARGOS } from '../../domain/usuario/usuario';
import { Roles } from 'src/core/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller()
export class CriarAreaAfetadaController {
  constructor(private readonly criarAreaAfetada: CriarAreaAfetada) {}

  @Post('/area')
  @Roles(CARGOS.AGENT)
  async execute(@Body() body: CreateAffectedAreaDTO, @User() user: Usuario) {

    const affectedArea = await this.criarAreaAfetada.execute({
      ...body,
      id_usuario: user.id,
    });

    return {
      id: affectedArea.id,
      name: affectedArea.nome,
      order: affectedArea.ordem,
      disasterId: affectedArea.desastreId,
    };
  }
}
