import { Cidade } from '../../domain/cidade/cidade';
import { CidadeRepository } from '../../repositories/CidadeRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarCidades {
  constructor(private readonly cidadeRepository: CidadeRepository) {}

  async execute(): Promise<Cidade[]> {
    return await this.cidadeRepository.findAll();
  }
}
