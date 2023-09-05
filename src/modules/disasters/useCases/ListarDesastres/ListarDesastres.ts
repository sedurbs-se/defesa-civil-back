import { Injectable } from '@nestjs/common';
import { DesastreRepository } from '../../repositories/DesastreRepository';
import { Desastre } from '../../domain/desastre/desastre';

@Injectable()
export class ListarDesastres {
  constructor(private readonly desastreRepository: DesastreRepository) {}

  async execute(): Promise<Desastre[]> {
    return await this.desastreRepository.findAll();
  }
}
