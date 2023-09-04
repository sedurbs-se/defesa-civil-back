import { Injectable } from '@nestjs/common';
import { AcaoRepository } from '../../repositories/AcaoRepository';
import { Action } from '../../domain/acao';

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
