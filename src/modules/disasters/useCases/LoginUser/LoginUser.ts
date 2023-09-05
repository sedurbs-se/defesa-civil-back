import { AppError } from 'src/core/logic/error';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUser {
  constructor(
    private readonly userRepository: UsuarioRepository,
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
        agent_id: user.agente.id,
        name: user.nome,
        cpf: user.cpf,
        contact: user.agente.contato,
        function: user.agente.funcao,
        fl_lider_equipe: user.agente.fl_lider_equipe,
      },
      sub: user.id,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
