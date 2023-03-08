import { Disaster } from "src/modules/disasters/domain/disaster/disaster";
import { DisasterRepository } from "../IDisasterRepository";

class PrismaDisasterRepository implements DisasterRepository {
    save(disaster: Disaster): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Disaster> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Disaster[]> {
        throw new Error("Method not implemented.");
    }

}