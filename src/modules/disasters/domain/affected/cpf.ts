import { Either, left, right } from "src/core/logic/Either";
import { InvalidCPFError } from "./errors/invalid-cpf";

class CPF {
    private readonly value: string;
    
    constructor(value: string) {
        this.value = value;
    }
    
    public getValue(): string {
        return this.value;
    }

    static validate(value: string): boolean {
        return /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value);
    }

    static create(value: string): Either<InvalidCPFError, CPF> {
        if(!this.validate(value)){
            return left(new InvalidCPFError());
        }

        return right(new CPF(value));
    }

}

export {
    CPF
}


