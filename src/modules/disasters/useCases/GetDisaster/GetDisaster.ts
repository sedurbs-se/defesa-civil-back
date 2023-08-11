import { Injectable } from '@nestjs/common';
import { Disaster } from '../../domain/disaster/disaster';
import { DisasterRepository } from '../../repositories/IDisasterRepository';

@Injectable()
export class GetDisaster {
  constructor(private readonly disasterRepository: DisasterRepository) {}

  async execute(disaster_id: string): Promise<Disaster> {
    return await this.disasterRepository.find(disaster_id);
  }
}
