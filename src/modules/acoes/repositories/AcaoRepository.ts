import { Acao } from '../domain/acao';

export interface FindActionsOptions {
  unidadeHabitacionalId?: string;
  areaAfetadaId?: string;
}
export abstract class AcaoRepository {
  abstract save(action: Acao | null): Promise<void>;
  abstract find(id: string): Promise<Acao>;
  abstract findAll(options: FindActionsOptions): Promise<Acao[]>;
}
