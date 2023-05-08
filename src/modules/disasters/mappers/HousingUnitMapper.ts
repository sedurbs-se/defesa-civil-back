import { UnidadeHabitacional as PersistenceHousingUnit } from "@prisma/client";
import { HousingUnit } from "../domain/housingUnit/housing-unit";

export class HousingUnitMapper {
    static toDomain(raw: PersistenceHousingUnit) {
        return new HousingUnit({
            id: raw.id,
            address: raw.endereco,
            coordinates: raw.coordenadas.split(',').map(Number),
            affectedAreaId: raw.areaAfetadaId,
        });
    }

    static toPersistence(housingUnit: HousingUnit) {
        return {
            id: housingUnit.id,
            areaAfetadaId: housingUnit.affectedAreaId,
        };
    }
}