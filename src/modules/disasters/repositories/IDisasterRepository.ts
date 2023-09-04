import { Disaster } from '../domain/disaster/disaster';
import { DisasterWithDetails } from '../useCases/ObterDesastre/ObterDesastre';

export abstract class DisasterRepository {
  abstract save(disaster: Disaster): Promise<void>;
  abstract update(disaster: Disaster): Promise<void>;
  abstract find(id: string): Promise<Disaster>;
  abstract findAll(select_areas?: boolean): Promise<Disaster[]>;
  abstract getDisasterDetails(id: string): Promise<DisasterWithDetails>;
}
