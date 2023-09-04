import { AffectedArea } from '../domain/affectedArea/affected-area';
import { AffectedAreaWithDetails } from '../useCases/ObterArea/ObterArea';

export abstract class AffectedAreaRepository {
  abstract save(affectedArea: AffectedArea): Promise<void>;
  abstract update(affectedArea: AffectedArea): Promise<void>;
  abstract find(id: string): Promise<AffectedArea>;
  abstract findWithDetails(id: string): Promise<AffectedAreaWithDetails>;
  abstract findByOrder(order: number): Promise<AffectedArea>;
  abstract findAll(disaster_id: string): Promise<AffectedArea[]>;
}
