import { InvalidcpfError } from "../errors/invalid-cpf";
import { CPF } from "./cpf";


describe("CPF", () => {
    it("should not be able to create a CPF with invalid value", () => {
        const cpf = new CPF("123.456.789-002222");
        expect(cpf).toThrowError(InvalidcpfError);
    });
});