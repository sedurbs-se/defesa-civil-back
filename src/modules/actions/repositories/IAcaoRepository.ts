import { Action } from '../domain/action';

export interface FindActionsOptions {
  unidadeHabitacionalId?: string;
  areaAfetadaId?: string;
}
export abstract class AcaoRepository {
  abstract save(action: Action | null): Promise<void>;
  abstract find(id: string): Promise<Action>;
  abstract findAll(options: FindActionsOptions): Promise<Action[]>;
}
