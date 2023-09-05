import { Agente } from '../domain/agente/agente';

export abstract class AgenteRepository {
  abstract getById(id: string): Promise<Agente>;
  abstract getByUserId(id: string): Promise<Agente>;
  abstract findPage(page: number, limit: number): Promise<Agente[]>;
  abstract find(): Promise<Agente[]>;
  abstract findByCpf(cpf: string): Promise<Agente>;
  abstract save(Agent: Agente): Promise<void>;
  abstract update(Agent: Agente): Promise<void>;
}
