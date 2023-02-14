import { Disaster } from "../entities/disaster";
import { DisasterRepository } from "../repositories/disaster-repository";
import { v4 as uuidv4 } from "uuid";

interface RegisterDisasterRequest {
    address: string;
    coordinates: number[];
    city: string;
    event: string;
    date: Date;
    agentId: string;
}


export class RegisterDisaster {
    constructor(private disasterRepository: DisasterRepository) {}

    async execute(request: RegisterDisasterRequest): Promise<Disaster> {
        const disaster = new Disaster({
            id: uuidv4(),
            address: request.address,
            coordinates: request.coordinates,
            city: request.city,
            event: request.event,
            date: request.date,
            agentId: request.agentId,
        });

        await this.disasterRepository.save(disaster);

        return disaster;
    }
}