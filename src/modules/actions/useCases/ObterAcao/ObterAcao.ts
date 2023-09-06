import { Injectable } from '@nestjs/common';
import { AcaoRepository } from '../../repositories/AcaoRepository';

interface ListarAcoesRequest {
  id: string;
}

@Injectable()
export class ObterAcao {
  constructor(private readonly acaoRepository: AcaoRepository) {}

  async execute(request: ListarAcoesRequest) {
    return await this.acaoRepository.find(request.id);
  }
}
