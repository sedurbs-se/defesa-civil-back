import { Familia as PersistenceFamily } from "@prisma/client";
import { Family } from "../domain/family/family";

export class FamilyMapper {
    static toDomain(raw: PersistenceFamily) {
        return new Family({
            id: raw.id,
            housingUnitId: raw.unidadeHabitacionalId,
        });
    }

    static async toPersistence(family: Family) {
        return {
            id: family.id,
            unidadeHabitacionalId: family.housingUnitId,
        };
    }
}