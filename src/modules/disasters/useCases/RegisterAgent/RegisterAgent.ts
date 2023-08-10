import { AppError } from 'src/core/logic/error';
import { CreateAgentDTO } from '../../dtos/CreateAgentDTO';
import { IAgentRepository } from '../../repositories/IAgentRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { User } from '../../domain/user/user';
import { Agent } from '../../domain/agent/agent';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterAgent {
  constructor(
    private agentRepository: IAgentRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: CreateAgentDTO): Promise<void> {
    const existUser = await this.userRepository.getByCPF(data.cpf);

    if (existUser) {
      throw new AppError('CPF já cadastrado');
    }

    const user = new User({
      name: data.name,
      cpf: data.cpf,
    });

    await this.userRepository.save(user);

    const agent = new Agent({
      user_id: user.id,
      function: data.function,
      contact: data.contact,
    });

    await this.agentRepository.save(agent);
  }
}
