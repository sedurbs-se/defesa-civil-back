import { Team } from '../domain/agentTeam/team';

export abstract class ITeamRepository {
  abstract find(id: string): Promise<Team>;
  abstract findByAffectedAreaId(affectedAreaId: string): Promise<Team[]>;
  abstract save(team: Team): Promise<void>;
  abstract update(team: Team): Promise<void>;
}
