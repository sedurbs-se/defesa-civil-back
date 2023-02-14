export class InvalidcpfError extends Error {
    constructor() {
        super('Invalid cpf');
        this.name = 'INVALID_CPF_ERROR';
    }
}



