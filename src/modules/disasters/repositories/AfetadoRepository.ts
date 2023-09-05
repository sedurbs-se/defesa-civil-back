import { Afetado } from '../domain/afetado/afetado';

export abstract class AfetadoRepository {
  abstract save(affected: Afetado): Promise<Afetado>;
  abstract update(affected: Afetado): Promise<Afetado>;
  abstract saveMany(affected: Afetado[]): Promise<void>;
  abstract find(id: string): Promise<Afetado>;
  abstract findByCPF(cpf: string, unity_id: string): Promise<Afetado>;
  abstract findAll(unityId: string): Promise<Afetado[]>;
  abstract delete(id: string[]): Promise<void>;
}
