// TODO: Write tests; this is just a placeholder

import InMemoryHousingUnitRepository from "../../repositories/in-memory/InMemoryHousingUnitRepository"
import { CreateHousingUnit } from "./RegisterHousingUnit"

expect(1 + 1).toBe(2)


describe("Register Housing Unit", () => {

    it('should register a housing unit', () => {
        const rep = new InMemoryHousingUnitRepository();
        const affectedAreaRep = new InMemoryAffectedAreaRepository();

        const sut = new CreateHousingUnit(rep)
        sut.execute({
            address: 'Rua teste',
            coordinates: "22,22",
            affectedAreaId
        })
    })
})