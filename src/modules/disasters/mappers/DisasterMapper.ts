import { Desastre as PersistenceDisaster} from "@prisma/client";
import { Disaster } from "../domain/disaster/disaster";

export class DisasterMapper {
    static toDomain(raw: PersistenceDisaster) {
        return new Disaster({
            id: raw.id,
            address: raw.endereco,
            coordinates: [1],
            city: raw.municipio,
            event: raw.evento,
            date: raw.data,
            agentId: raw.agenteId,
        });
    }

    static async toPersistence(disaster: Disaster) {
        return {
            id: disaster.id,
            endereco: disaster.address,
            municipio: disaster.city,
            evento: disaster.event,
            data: disaster.date,
            agenteId: disaster.agentId,
        };
    }
}