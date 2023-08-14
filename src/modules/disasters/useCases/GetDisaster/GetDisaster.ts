import { Injectable } from '@nestjs/common';
import { Disaster } from '../../domain/disaster/disaster';
import { DisasterRepository } from '../../repositories/IDisasterRepository';

export interface DisasterWithDetails {
  disaster: Disaster;
  affected_people_count: number;
  unity_count: number;
  area_count: number;
}

@Injectable()
export class GetDisaster {
  constructor(private readonly disasterRepository: DisasterRepository) {}

  async execute(disaster_id: string): Promise<DisasterWithDetails> {
    return await this.disasterRepository.getDisasterDetails(disaster_id)
  }
}
