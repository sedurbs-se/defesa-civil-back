import { InvalidcpfError } from "../errors/invalid-cpf";

export class CPF {
    private value: string;
    
    constructor(value: string) {
        if (!CPF.validate(value)) {
            throw new InvalidcpfError();
        }
        this.value = value;
    }
    
    public getValue(): string {
        return this.value;
    }

    public static validate(value: string): boolean {
        return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value);
    }
}


