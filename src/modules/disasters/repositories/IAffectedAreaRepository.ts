import { AffectedArea } from '../domain/affectedArea/affected-area';

export abstract class AffectedAreaRepository {
  abstract save(affectedArea: AffectedArea): Promise<void>;
  abstract update(affectedArea: AffectedArea): Promise<void>;
  abstract find(id: string): Promise<AffectedArea>;
  abstract findByOrder(order: number): Promise<AffectedArea>;
  abstract findAll(disaster_id: string): Promise<AffectedArea[]>;
}
