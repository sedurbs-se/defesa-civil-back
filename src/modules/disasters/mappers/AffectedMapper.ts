import { Afetado as PersistenceAffected } from "@prisma/client";
import { Affected } from "../domain/affected/affected";
import { CPF } from "../domain/affected/cpf";

export class AffectedMapper {
    static toDomain(raw: PersistenceAffected) {
        const cpfOrError = CPF.create(raw.cpf);

        if (cpfOrError.isLeft()) {
            throw new Error("CPF value is invalid");
        }

        return new Affected({
            id: raw.id,
            name: raw.nome,
            age: raw.idade,
            sex: raw.sexo,
            cpf: cpfOrError.value,
            contact: raw.contato,
            hasCleanWaterAccess: raw.temAguaPotavel,
            hasElectricityAccess: raw.temEletricidade,
            canCook: raw.podeCozinhar,
            inParentOrFriendHouse: raw.EmParenteOuCasaDeAmigos,
            inPublicShelter: raw.EmAbrigoPublico,
            exCleanWater: raw.exAguaPotavel,
            exElectricity: raw.exEletricidade,
            exParentOrFriendHouse: raw.exParenteOuCasaDeAmigos,
            exPublicShelter: raw.exAbrigoPublico,
            familyId: raw.familiaId

        })
    }

    static async toPersistence(affected: Affected) {
        return {
            id: affected.id,
            nome: affected.name,
            idade: affected.age,
            sexo: affected.sex,
            cpf: affected.cpf,
            contato: affected.contact,
            temAguaPotavel: affected.hasCleanWaterAccess,
            temEletricidade: affected.hasElectricityAccess,
            podeCozinhar: affected.canCook,
            EmParenteOuCasaDeAmigos: affected.inParentOrFriendHouse,
            EmAbrigoPublico: affected.inPublicShelter,
            exAguaPotavel: affected.exCleanWater,
            exEletricidade: affected.exElectricity,
            exParenteOuCasaDeAmigos: affected.exParentOrFriendHouse,
            exAbrigoPublico: affected.exPublicShelter,
            familiaId: affected.familyId
        }
    }
}