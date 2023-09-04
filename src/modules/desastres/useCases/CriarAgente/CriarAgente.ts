import { AppError } from 'src/core/logic/error';
import { CreateAgentDTO } from '../../dtos/CreateAgentDTO';
import { AgenteRepository } from '../../repositories/AgenteRepository';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import { CARGOS, Usuario } from '../../domain/usuario/usuario';
import { Agente } from '../../domain/agente/agente';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CriarAgente {
  constructor(
    private agentRepository: AgenteRepository,
    private userRepository: UsuarioRepository,
  ) {}

  async execute(data: CreateAgentDTO): Promise<void> {
    const existUser = await this.userRepository.getByCPF(data.cpf);

    if (existUser) {
      throw new AppError('CPF já cadastrado');
    }

    const user = new Usuario({
      nome: data.name,
      cpf: data.cpf,
      cargo: CARGOS.AGENT,
    });

    await this.userRepository.save(user);

    const agent = new Agente({
      usuarioId: user.id,
      funcao: data.function,
      contato: data.contact,
    });

    await this.agentRepository.save(agent);
  }
}
