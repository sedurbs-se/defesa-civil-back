import { AreaAfetada } from '../domain/areaAfetada/area-afetada';
import { AffectedAreaWithDetails } from '../useCases/ObterArea/ObterArea';

export abstract class AreaAfetadaRepository {
  abstract save(affectedArea: AreaAfetada): Promise<void>;
  abstract update(affectedArea: AreaAfetada): Promise<void>;
  abstract delete(affectedArea: AreaAfetada): Promise<AreaAfetada>;
  abstract find(id: string): Promise<AreaAfetada>;
  abstract findWithDetails(id: string): Promise<AffectedAreaWithDetails>;
  abstract findByOrder(order: number): Promise<AreaAfetada>;
  abstract findAll(disaster_id: string): Promise<AreaAfetada[]>;
}
