import { Action } from '../domain/action';

export abstract class AcaoRepository {
  abstract save(action: Action | null): Promise<void>;
  abstract find(id: string): Promise<Action>;
  abstract findAll(): Promise<Action[]>;
}
