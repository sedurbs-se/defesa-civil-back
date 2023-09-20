import { UnidadeHabitacional } from '../domain/unidadeHabitacional/unidade-habitacional';

export abstract class UnidadeHabitacionalRepository {
  abstract save(housingUnit: UnidadeHabitacional): Promise<void>;
  abstract update(housingUnit: UnidadeHabitacional): Promise<void>;
  abstract delete(housingUnit: UnidadeHabitacional): Promise<UnidadeHabitacional>;
  abstract find(id: string): Promise<UnidadeHabitacional>;
  abstract findByOrdem(ordem: number): Promise<UnidadeHabitacional>;
  abstract findAll(area_id: string): Promise<UnidadeHabitacional[]>;
}
