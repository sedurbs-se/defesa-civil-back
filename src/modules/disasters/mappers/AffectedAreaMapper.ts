import { AreaAfetada as PersistenceAffectedArea } from "@prisma/client";
import { AffectedArea } from "../domain/affectedArea/affected-area";

export class AffectedAreaMapper {
    static toDomain(raw: PersistenceAffectedArea) {
        return new AffectedArea({
            id: raw.id,
            disasterId: raw.desastreId,
            name: raw.nome,
            address: raw.endereco,
            coordinates: raw.coordenadas.split(',').map(Number),
        });

    }

    static toPersistence(affectedArea: AffectedArea) {
        return {
            id: affectedArea.id,
            desastreId: affectedArea.disasterId,
            nome: affectedArea.name,
            endereco: affectedArea.address,
            coordenadas: affectedArea.coordinates.join(','),
        };
    }
}