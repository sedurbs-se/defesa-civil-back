import { Affected } from "../domain/affected/affected";

export abstract class AffectedRepository {
  abstract save(affected: Affected): Promise<void>;
  abstract update(affected: Affected): Promise<void>;
  abstract saveMany(affected: Affected[]): Promise<void>;
  abstract find(id: string): Promise<Affected>;
  abstract findByCPF(cpf: string, unity_id: string): Promise<Affected>;
  abstract findAll(unityId: string): Promise<Affected[]>;
  abstract delete(id: string[]): Promise<void>;
}
