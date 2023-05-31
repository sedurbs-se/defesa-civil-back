import { Injectable } from "@nestjs/common";
import { DisasterRepository } from "../../repositories/IDisasterRepository";
import { Disaster } from "../../domain/disaster/disaster";

@Injectable()
export class GetDisaster {
    constructor(private readonly DisasterRepository: DisasterRepository) {}
    
    async execute(disaster_id:string): Promise<Disaster> {
        return await this.DisasterRepository.find(disaster_id)
    }
}