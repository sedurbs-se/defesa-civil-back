export class InvalidCPFError extends Error {
  constructor() {
    super('CPF inválido ou não informado.');
    this.name = 'INVALID_CPF_ERROR';
  }
}
