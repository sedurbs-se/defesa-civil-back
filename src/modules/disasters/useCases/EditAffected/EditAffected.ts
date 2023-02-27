import { Affected, AffectedProps } from "../../domain/affected/affected";
import { AffectedRepository } from "../../repositories/IAffectedRepository";
import { OptionalExceptFor } from "src/core/logic/OptionalExceptFor";

// Take the Interface of the affected props, pick the id as mandatory and the rest as optional

type EditAffectedRequest = OptionalExceptFor<AffectedProps, 'id'>



export class EditAffected {
    constructor(private affectedRepository: AffectedRepository) {}

    async execute(request: EditAffectedRequest): Promise<Affected> {

        const affected = await this.affectedRepository.find(request.id);

        if (!affected) {
            throw new Error('Affected not found');
        }

        const mergedAffected = { ...affected, ...request };

        const updatedAffected = new Affected(mergedAffected as AffectedProps)

        await this.affectedRepository.save(updatedAffected);

        return updatedAffected;
    }
}