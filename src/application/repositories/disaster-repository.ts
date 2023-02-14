import { Disaster } from "../entities/disaster";

export abstract class DisasterRepository {
    abstract save(disaster: Disaster): Promise<void>;
    abstract find(id: string): Promise<Disaster>;
    abstract findAll(): Promise<Disaster[]>;
}