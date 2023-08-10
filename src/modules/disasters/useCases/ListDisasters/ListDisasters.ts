import { Injectable } from '@nestjs/common';
import { DisasterRepository } from '../../repositories/IDisasterRepository';
import { Disaster } from '../../domain/disaster/disaster';

@Injectable()
export class ListDisasters {
  constructor(private readonly disasterRepository: DisasterRepository) {}

  async execute(): Promise<Disaster[]> {
    return await this.disasterRepository.findAll();
  }
}
