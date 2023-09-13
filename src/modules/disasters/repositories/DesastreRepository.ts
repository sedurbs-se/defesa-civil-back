import { Desastre } from '../domain/desastre/desastre';
import { DisasterWithDetails } from '../useCases/ObterDesastre/ObterDesastre';

export abstract class DesastreRepository {
  abstract save(disaster: Desastre): Promise<void>;
  abstract update(disaster: Desastre): Promise<void>;
  abstract delete(disaster: Desastre): Promise<Desastre>;
  abstract find(id: string): Promise<Desastre>;
  abstract findAll(select_areas?: boolean): Promise<Desastre[]>;
  abstract getDisasterDetails(id: string): Promise<DisasterWithDetails>;
}
