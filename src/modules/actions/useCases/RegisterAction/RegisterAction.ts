import { Injectable } from '@nestjs/common';
import { AcaoRepository } from '../../repositories/IAcaoRepository';
import { Action } from '../../domain/action';

interface RegisterActionRequest {
  action: Action;
}

@Injectable()
export class RegisterAction {
  constructor(private readonly acaoRepository: AcaoRepository) {}

  async execute({ action }: RegisterActionRequest) {
    await this.acaoRepository.save(action);
  }
}
