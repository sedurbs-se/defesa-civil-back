import { Equipe } from '../domain/agenteEquipe/equipe';

export abstract class EquipeRepository {
  abstract find(id: string): Promise<Equipe>;
  abstract findByAffectedAreaId(affectedAreaId: string): Promise<Equipe[]>;
  abstract save(team: Equipe): Promise<void>;
  abstract update(team: Equipe): Promise<void>;
}
