import { FotosRepository } from '../../repositories/FotosRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletarFotos {
  constructor(private fotosRepository: FotosRepository) {}

  async execute(deletedIds: string[]) {
    await this.fotosRepository.delete(deletedIds);
  }
}
