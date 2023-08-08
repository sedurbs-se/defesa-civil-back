import { Agent } from "../domain/agent/agent";

export abstract class IAgentRepository {
    abstract getById(id: string): Promise<Agent>;
    abstract getByUserId(id: string): Promise<Agent>;
    abstract findPage(page: number, limit: number): Promise<Agent[]>;
    abstract find(): Promise<Agent[]>;
    abstract findByCpf(cpf: string): Promise<Agent>;
    abstract save(Agent: Agent): Promise<void>;
    abstract update(Agent: Agent): Promise<void>;
}