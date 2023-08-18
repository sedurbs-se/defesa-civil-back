import { AppError } from 'src/core/logic/error';
import { IUserRepository } from '../../repositories/IUserRepository';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(cpf: string): Promise<{ token: string }> {
    const user = await this.userRepository.getByCPF(cpf);

    if (!user) {
      throw new AppError('CPF não cadastrado');
    }
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        contact: user.agent.contact,
        function: user.agent.function,
        fl_lider_equipe: user.agent.fl_lider_equipe,
      },
      sub: user.id,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
